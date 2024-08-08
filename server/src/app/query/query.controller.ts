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
                city:req.body.city,
               DomesticOrInternational:req.body.DomesticOrInternational,
               hotelName:req.body.hotelName,
               checkInDate:req.body.checkInDate,
               checkOutDate:req.body.checkOutDate,
               noOfNights:req.body.noOfNights,
               mealPlan:req.body.mealPlan,
               hotelCategory:req.body.hotelCategory,
               roomOcuppency:req.body.roomOcuppency,
               noOfRooms:req.body.noOfRooms,
                noOfGuests:req.body.noOfGuests,
                noOfAdults:req.body.noOfAdults,
                noOfChildren6:req.body.noOfChildren6,
                noOfChildren12:req.body.noOfChildren12,




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

export const HotelQueryConfirmed=async(req:Request,res:Response)=>{
    try {
        const queryId=req.params.id;
        
        
        await QueryModel.findOneAndUpdate({_id:queryId,serviceType:'Hotel'},{
            ...req.body,
            contact:req.body.contact,
            email:req.body.email,
            guestName:req.body.guestName,
            bookconfirmNo:req.body.bookconfirmNo,
            ourCost:req.body.ourCost,
            prf:req.body.prf,
            address:req.body.address,

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


export const findQueryByID=async(req:Request,res:Response)=>{
    try {
        const queryId=req.params.id;
        const query=await QueryModel.findOne({_id:queryId});
        return res.status(200).json({message:"Query fetched successfully",result:query});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}

