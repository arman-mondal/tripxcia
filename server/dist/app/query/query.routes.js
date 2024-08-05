"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryRoutes = void 0;
const express_1 = require("express");
const query_controller_1 = require("./query.controller");
const app = (0, express_1.Router)();
exports.QueryRoutes = app;
app.post("/flight/save", query_controller_1.FlightQuerySave);
app.get("/flight/list", query_controller_1.getFlightQueries);
app.put("/flight/confirm/:id", query_controller_1.FlightQueryConfirmed);
// Compare this snippet from server/src/app/query/query.model.ts:`
