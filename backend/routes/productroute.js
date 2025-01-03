// productRoutes.js
import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controller/productcontroller.js";

const router = express.Router();

router.post("/api/products", createProduct);

router.delete("/api/products/:id", deleteProduct);

router.get("/api/products", getProducts);

router.put("/api/products/:id", updateProduct);

export default router;
