import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js"

const app = express();

dotenv.config();
const port = process.env.PORT;

connectDB()
    .then(() => {
        console.log("server started successfully")
    }).catch((err) => {
        console.log(" server failed to start", err)
    })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});