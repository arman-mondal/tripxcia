import mongoose, { Schema } from "mongoose";
import { QueryInterface } from "./query.interface";
const QuerySchema = new mongoose.Schema<QueryInterface>({
    client: { type: String, required: false },
    serviceType: { type: String, required: false },
    PassengerNumber: { type: Number, required: false },
    DomesticOrInternational: { type: String, required: false },
    OneWayOrRoundTrip: { type: String, required: false },
    FromLocation: { type: String, required: false },
    ToLocation: { type: String, required: false },
    DepartureDate: { type: String, required: false },
    returnDate: { type: String, required: false },
    flightType: { type: String, required: false },
    airlineName: { type: String, required: false },
    flightNumber: { type: String, required: false },
    fareType: { type: String, required: false },
    departureFrom: { type: String, required: false },
    departureTime: { type: String, required: false },
    arrivalTo: { type: String, required: false },
    arrivalTime: { type: String, required: false },
    ourCost: { type: Number, required: false },
    prf: { type: Number, required: false },
    refundable: { type: Boolean, required: false },
    passengerName: { type: String, required: false },
    gender: { type: String, required: false },
    pnrNumber: { type: String, required: false },
    seatNumber: { type: String, required: false },
    class: { type: String, required: false },
    meal: { type: Boolean, required: false },
    invoiceNumber: { type: String, required: false },
    vendorName: { type: String, required: false },
    status: { type: Number, required: false },
    bookingDate: { type: String, required: false },
    city: { type: String, required: false },
    hotelName: { type: String, required: false },
    checkInDate: { type: String, required: false },
    checkOutDate: { type: String, required: false },
    noOfNights: { type: Number, required: false },
    mealPlan: { type: String, required: false },
    hotelCategory: { type: String, required: false },
    roomOcuppency: { type: String, required: false },
    noOfRooms: { type: Number, required: false },
    noOfGuests: { type: Number, required: false },
    noOfAdults: { type: Number, required: false },
    noOfChildren6: { type: Number, required: false },
    noOfChildren12: { type: Number, required: false },
    address: { type: String, required: false },
    contact: { type: String, required: false },
    email: { type: String, required: false },
    guestName: { type: String, required: false },
    bookconfirmNo: { type: String, required: false },
    price: { type: Number, required: false },
    timestamp: { type: Date, required: false ,default:Date.now()},
    duplicate: [
        {
            type: Schema.Types.Mixed,
            required: false
        }
    ],
    via:{
        FlightNumber: { type: String, required: false },
        departureFrom: { type: String, required: false },
        departureTime: { type: String, required: false },
        arrivalTo: { type: String, required: false },
        arrivalTime: { type: String, required: false },

    },
    
    confirmed: { type: Schema.Types.Mixed, required: false }

});

export const QueryModel = mongoose.model<QueryInterface>('Query', QuerySchema);