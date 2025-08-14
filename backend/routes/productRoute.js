import express from "express";
import multer from "multer";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";

const productRouter = express.Router();
const upload = multer(); // multer memory storage for files (image uploads)

// Add product (with multiple images upload)
productRouter.post("/add-product", upload.array("images", 5), addProduct);

// Update product by ID (optional images upload)
productRouter.put("/update-product/:id", upload.array("images", 5), updateProduct);

// Delete product by ID
productRouter.delete("/delete-product/:id", deleteProduct);

// Get all products (with optional filters)
productRouter.get("/get-product", getAllProducts);

// Get single product by ID
productRouter.get("/get-productId/:id", getProductById);

export default productRouter;
