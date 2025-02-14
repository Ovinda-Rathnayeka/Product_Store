// server.js
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import productRoutes from "./routes/productroute.js"; // Importing product routes

dotenv.config();

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 5000;

// Use the product routes
app.use("/", productRoutes); // All the product-related routes will be handled by productRoutes

// Server listening
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port", PORT);
});
