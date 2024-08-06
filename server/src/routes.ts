import { Router } from "express";
import { QueryRoutes } from "./app/query/query.routes";
import { clientRouter } from "./app/clients/client.routes";
import { VendorRoutes } from "./app/vendor/vendor.routes";
import { AuthRoutes } from "./app/auth/auth.routes";
import { MiddlewareController } from "./app/middleware/middleware.controller";

const app=Router();

app.use('/query',MiddlewareController,QueryRoutes);
app.use('/clients',MiddlewareController,clientRouter);
app.use('/vendors',MiddlewareController,VendorRoutes);
app.use('/auth',AuthRoutes);

export{
    app as Router
}