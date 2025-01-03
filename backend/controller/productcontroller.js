// controller.js
import product from "../model/productmodel.js";

// Controller for creating a new product
export const createProduct = async (req, res) => {
  const productData = req.body;

  // Validation check for required fields
  if (!productData.name || !productData.price || !productData.image) {
    return res
      .status(400)
      .send({ success: false, message: "Please fill all fields" });
  }

  const newProduct = new product(productData);

  try {
    await newProduct.save();
    res.status(201).send({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error In Create Product: ", error.message);
    res.status(500).send({ success: false, message: "Server Error" });
  }
};

// Controller for deleting a product
export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const productToDelete = await product.findById(id);

    if (!productToDelete) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    await productToDelete.deleteOne();
    res.send({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("Error In Delete Product: ", error.message);
    res.status(500).send({ success: false, message: "Server Error" });
  }
};

// Controller for fetching all products
export const getProducts = async (req, res) => {
  try {
    const products = await product.find({});
    res.send({ success: true, data: products });
  } catch (error) {
    console.error("Error In Fetch Products: ", error.message);
    res.status(500).send({ success: false, message: "Server Error" });
  }
};

// Controller for updating a product
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const productData = req.body;

  try {
    const productToUpdate = await product.findById(id);

    if (!productToUpdate) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    productToUpdate.set(productData);
    await productToUpdate.save();

    res.send({ success: true, data: productToUpdate });
  } catch (error) {
    console.error("Error In Update Product: ", error.message);
    res.status(500).send({ success: false, message: "Server Error" });
  }
};
