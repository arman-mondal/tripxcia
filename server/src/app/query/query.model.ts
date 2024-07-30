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

});

export const QueryModel = mongoose.model<QueryInterface>('Query', QuerySchema);