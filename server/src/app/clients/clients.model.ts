import { model, Schema } from "mongoose";
import { Client } from "./clients.interface";


const ClientSchema = new Schema<Client>({
    name: { type: String, required: false },
    address: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    website: { type: String, required: false },
    contactPersonNumber: { type: String, required: false },
    contactPersonEmail: { type: String, required: false },
    birthday: { type: String, required: false },
    panNumber: { type: String, required: false },
    tanNumber: { type: String, required: false },
    cinNumber: { type: String, required: false },
    gstinNumber: { type: String, required: false },
    password: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

export const ClientModel= model<Client>('Client', ClientSchema);