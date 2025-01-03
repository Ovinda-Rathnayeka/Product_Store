import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import product from "./model/productmodel.js"; // Importing as 'product'

dotenv.config();

const app = express();

app.use(express.json());

// Route to create a new product
app.post("/api/products", async (req, res) => {
  const productData = req.body; // Renamed from 'products' to 'productData'

  // Validation check for required fields
  if (!productData.name || !productData.price || !productData.image) {
    return res
      .status(400)
      .send({ success: false, message: "Please fill all fields" });
  }

  // Create new product instance using the correct model reference
  const newProduct = new product(productData);

  try {
    await newProduct.save();
    res.status(201).send({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error In Create Product: ", error.message);
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

// Route to delete a product
app.delete("/api/products/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const productToDelete = await product.findById(id);

    if (!productToDelete) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    // Using deleteOne instead of remove (recommended in Mongoose 6.x+)
    await productToDelete.deleteOne();

    res.send({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("Error In Delete Product: ", error.message);
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

// Server listening
app.listen(5000, () => {
  connectDB();
  console.log("Server is running on port 5000");
});
