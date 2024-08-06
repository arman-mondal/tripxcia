import { model, Schema } from "mongoose";

export interface MiddlewareLogInterface {
    method: string;
    userId: string;
    clientIp: string;
    clientPlatform: string;
    url: string;
    status: number;
    message: string;
    timestamp: string;
}


const AccessLogsSchema = new Schema<MiddlewareLogInterface>({
    method: { type: String, required: false },
    userId: { type: String, required: false },
    url: { type: String, required: false },
    clientIp: { type: String, required: false },
    clientPlatform: { type: String, required: false },
    status: { type: Number, required: false },
    message: { type: String, required: false },
    timestamp: { type: String, required: false },
});

export const AccessLogsModel = model<MiddlewareLogInterface>("AccessLogs", AccessLogsSchema);
