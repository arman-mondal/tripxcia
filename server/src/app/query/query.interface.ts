import mongoose from "mongoose";

export interface QueryInterface{
    _id:mongoose.Types.ObjectId;
    client:string;
    serviceType:string;
    PassengerNumber:number;
    DomesticOrInternational:string;
    OneWayOrRoundTrip:string;
    FromLocation:string;
    ToLocation:string;
    DepartureDate:string;
    returnDate:string;
    flightType:string;
    airlineName:string;
    flightNumber:string;
    fareType:string;
    departureFrom:string;
    departureTime:string;
    arrivalTo:string;
    arrivalTime:string;
    ourCost:number;
    prf:number;
    refundable:boolean;
    passengerName?:string;
    gender?:string;
    pnrNumber?:string;
    seatNumber?:string;
    class?:string;
    meal?:boolean;
    invoiceNumber?:string;
    vendorName?:string;
    status?:number;
    bookingDate?:string;
    
    
    
}