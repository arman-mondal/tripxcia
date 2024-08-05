import { Router } from "express";
import { createClient, DeleteClient, getClients, UpdateClient } from "./client.controller";


const app=Router();


app.post('/create',createClient);
app.get('/get',getClients);
app.delete('/delete/:id',DeleteClient);
app.put('/update/:id',UpdateClient);

export {
    app as clientRouter
}