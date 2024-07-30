import { Router } from "express";
import { QueryRoutes } from "./app/query/query.routes";

const app=Router();

app.use('/query',QueryRoutes);

export{
    app as Router
}