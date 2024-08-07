import { Request, Response } from "express";
import { QueryModel } from "./query.model";

export const FlightQuerySave=async(req:Request,res:Response)=>{
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const query = await new QueryModel({
            client:req.body.client,
            serviceType:'Flight',
            PassengerNumber:req.body.PassengerNumber,
            DomesticOrInternational:req.body.DomesticOrInternational,
            OneWayOrRoundTrip:req.body.OneWayOrRoundTrip,
            FromLocation:req.body.FromLocation,
            ToLocation:req.body.ToLocation,
            DepartureDate:req.body.DepartureDate,
            returnDate:req.body.returnDate,
            flightType:req.body.flightType,
            airlineName:req.body.airlineName,
            flightNumber:req.body.flightNumber,
            fareType:req.body.fareType,
            departureFrom:req.body.departureFrom,
            departureTime:req.body.departureTime,
            arrivalTo:req.body.arrivalTo,
            arrivalTime:req.body.arrivalTime,
            ourCost:req.body.ourCost,
            prf:req.body.prf,
            refundable:req.body.refundable,
            bookingDate:formattedDate,
        });
        console.log(query)
        await query.save().then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const HotelQuery=async(req:Request,res:Response)=>{
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const query = await new QueryModel({
            client:req.body.client,
            serviceType:'Hotel',
            PassengerNumber:req.body.PassengerNumber,
            DomesticOrInternational:req.body.DomesticOrInternational,
            OneWayOrRoundTrip:req.body.OneWayOrRoundTrip,
            FromLocation:req.body.FromLocation,
            ToLocation:req.body.ToLocation,
            DepartureDate:req.body.DepartureDate,
            returnDate:req.body.returnDate,
            flightType:req.body.flightType,
            airlineName:req.body.airlineName,
            flightNumber:req.body.flightNumber,
            fareType:req.body.fareType,
            departureFrom:req.body.departureFrom,
            departureTime:req.body.departureTime,
            arrivalTo:req.body.arrivalTo,
            arrivalTime:req.body.arrivalTime,
            ourCost:req.body.ourCost,
            prf:req.body.prf,
            refundable:req.body.refundable,
            bookingDate:formattedDate,
        });
        console.log(query)
        await query.save().then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}



export const FlightQueryConfirmed=async(req:Request,res:Response)=>{
    try {
        const queryId=req.params.id;
        
        
        await QueryModel.findOneAndUpdate({_id:queryId},{
            passengerName:req.body.passengerName,
            gender:req.body.gender,
            pnrNumber:req.body.pnrNumber,
            seatNumber:req.body.seatNumber,
            class:req.body.class,
            meal:req.body.meal,
            invoiceNumber:req.body.invoiceNumber,
            vendorName:req.body.vendorName,
            status:1,

        })
        .then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const getFlightQueries=async(req:Request,res:Response)=>{
    try {
        const queries=await QueryModel.find({serviceType:"Flight"});
        return res.status(200).json({message:"Queries fetched successfully",result:queries});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}


export const getHotelQueries=async(req:Request,res:Response)=>{
    try {
        const queries=await QueryModel.find({serviceType:"Hotel"});
        return res.status(200).json({message:"Queries fetched successfully",result:queries});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}


export const getAllQueries=async(req:Request,res:Response)=>{
    try {
        const queries=await QueryModel.find();
        return res.status(200).json({message:"Queries fetched successfully",result:queries});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}



