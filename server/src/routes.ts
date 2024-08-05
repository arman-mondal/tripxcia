import { Router } from "express";
import { QueryRoutes } from "./app/query/query.routes";
import { clientRouter } from "./app/clients/client.routes";
import { VendorRoutes } from "./app/vendor/vendor.routes";

const app=Router();

app.use('/query',QueryRoutes);
app.use('/clients',clientRouter);
app.use('/vendors',VendorRoutes);

export{
    app as Router
}