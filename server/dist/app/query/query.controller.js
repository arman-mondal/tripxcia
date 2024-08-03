"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlightQueries = exports.FlightQuerySave = void 0;
const query_model_1 = require("./query.model");
const FlightQuerySave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield new query_model_1.QueryModel({
            client: req.body.client,
            serviceType: req.body.serviceType,
            PassengerNumber: req.body.PassengerNumber,
            DomesticOrInternational: req.body.DomesticOrInternational,
            OneWayOrRoundTrip: req.body.OneWayOrRoundTrip,
            FromLocation: req.body.FromLocation,
            ToLocation: req.body.ToLocation,
            DepartureDate: req.body.DepartureDate,
            returnDate: req.body.returnDate,
            flightType: req.body.flightType,
            airlineName: req.body.airlineName,
            flightNumber: req.body.flightNumber,
            fareType: req.body.fareType,
            departureFrom: req.body.departureFrom,
            departureTime: req.body.departureTime,
            arrivalTo: req.body.arrivalTo,
            arrivalTime: req.body.arrivalTime,
            ourCost: req.body.ourCost,
            prf: req.body.prf,
            refundable: req.body.refundable
        });
        console.log(query);
        yield query.save().then((result) => {
            console.log(result);
            return res.status(200).json({ message: "Query Saved Successfully", result: result });
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({ message: error });
        });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.FlightQuerySave = FlightQuerySave;
const getFlightQueries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = yield query_model_1.QueryModel.find({ serviceType: "Flight" });
        return res.status(200).json({ message: "Queries fetched successfully", result: queries });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getFlightQueries = getFlightQueries;
