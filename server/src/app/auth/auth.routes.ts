import { Router } from "express";
import { AuthLogin, AuthRegister } from "./auth.controller";


const app=Router();

app.post('/login',AuthLogin);
app.post('/register',AuthRegister);


export {
    app as AuthRoutes
}