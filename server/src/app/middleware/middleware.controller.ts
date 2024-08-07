import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AccessLogsModel, MiddlewareLogInterface } from "./middleware.log";
export const MiddlewareController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
        if(!req.headers.authorization){
            return res.status(403).json({
                message: "Unauthorized"
            })
        }
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(403).json({
                message: "Unauthorized"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT || 'defaultSecret') as JwtPayload;
        if(!decoded){

            return res.status(403).json({
                message: "Unauthorized"
            })
        }
        const log:MiddlewareLogInterface={
            method: req.method,
            url: req.url,
            userId: decoded._id,
            status: 200,
            message: "Success",
            timestamp: new Date().toISOString(),
            clientIp: req.ip ?? '',
            clientPlatform: req.headers['user-agent'] || "" 
          
        }
        await AccessLogsModel.create(log);

        next();


        
    } catch (error) {
        return res.status(403).json({
            message: "Unauthorized"
        })
    }
   
}



export const MiddlewareLog = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const logs=await AccessLogsModel.find();
        return res.status(200).json({
            logs: logs
        })
    
    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
