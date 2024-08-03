import { Router } from "express";

import { FlightQueryConfirmed, FlightQuerySave, getFlightQueries } from "./query.controller";
const app=Router();

app.post("/flight/save",FlightQuerySave);
app.get("/flight/list",getFlightQueries);
app.put("/flight/confirm/:id",FlightQueryConfirmed);


export {
    app as QueryRoutes
}

// Compare this snippet from server/src/app/query/query.model.ts:`