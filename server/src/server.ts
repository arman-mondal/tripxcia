import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Router } from "./routes";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
dotenv.config();
const ser="hh"
mongoose.connect(process.env.MONGO_URI as string);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB");
});

const app: Express = express();
const corsOptions: cors.CorsOptions = {
  origin: "*",
};

const accessLogStream = fs.createWriteStream("log.json", { flags: "a" });

app.use(morgan("combined", { stream: accessLogStream }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use('/', Router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
