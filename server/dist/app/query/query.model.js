"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QuerySchema = new mongoose_1.default.Schema({
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
});
exports.QueryModel = mongoose_1.default.model('Query', QuerySchema);
