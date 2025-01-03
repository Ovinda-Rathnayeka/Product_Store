import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";

dotenv.config();

const app = express();

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on port 5000");
});