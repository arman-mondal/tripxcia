import { model, Schema } from "mongoose";
import { AuthInterface } from "./auth.interface";

const AuthSchema = new Schema<AuthInterface>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, required: false },
    token: { type: String, required: false },
    createdAt: { type: String, required: false ,default: new Date().toISOString()},
    updatedAt: { type: String, required: false ,default: new Date().toISOString()},
});

export const AuthModel = model<AuthInterface>("Users", AuthSchema);
