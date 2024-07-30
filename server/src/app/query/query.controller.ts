import { Request, Response } from "express";
import { QueryModel } from "./query.model";

export const FlightQuerySave=async(req:Request,res:Response)=>{
    try {
        const query = await new QueryModel({
            client:req.body.client,
            serviceType:req.body.serviceType,
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
            refundable:req.body.refundable
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

export const getFlightQueries=async(req:Request,res:Response)=>{
    try {
        const queries=await QueryModel.find({serviceType:"Flight"});
        return res.status(200).json({message:"Queries fetched successfully",result:queries});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}
