import { Router } from "express";

import { findQueryByID, FlightQueryConfirmed, FlightQuerySave, getAllQueries, getFlightQueries, getHotelQueries, HotelQuery, HotelQueryConfirmed } from "./query.controller";
const app=Router();

app.post("/flight/save",FlightQuerySave);
app.get("/flight/list",getFlightQueries);
app.put("/flight/confirm/:id",FlightQueryConfirmed);
app.get('/',getAllQueries);
app.post('/hotel/save',HotelQuery);
app.get('/hotel/list',getHotelQueries);
app.get('/:id',findQueryByID);
app.put('/hotel/confirm/:id',HotelQueryConfirmed);
export {
    app as QueryRoutes
}

// Compare this snippet from server/src/app/query/query.model.ts:`