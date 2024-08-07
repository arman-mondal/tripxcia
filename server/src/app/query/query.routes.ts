import { Router } from "express";

import { FlightQueryConfirmed, FlightQuerySave, getAllQueries, getFlightQueries, getHotelQueries, HotelQuery } from "./query.controller";
const app=Router();

app.post("/flight/save",FlightQuerySave);
app.get("/flight/list",getFlightQueries);
app.put("/flight/confirm/:id",FlightQueryConfirmed);
app.get('/',getAllQueries);
app.post('/hotel/save',HotelQuery);
app.get('/hotel/list',getHotelQueries);
export {
    app as QueryRoutes
}

// Compare this snippet from server/src/app/query/query.model.ts:`