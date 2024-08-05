import { Router } from "express";
import { createVendor, DeleteVendor, getVendorById, getVendors, UpdateVendor } from "./vendor.controller";

const app=Router();

app.post('/create',createVendor);
app.get('/get',getVendors);
app.delete('/delete/:id',DeleteVendor);
app.put('/update/:id',UpdateVendor);
app.get('/get/:id',getVendorById);


export {
    app as VendorRoutes
}
