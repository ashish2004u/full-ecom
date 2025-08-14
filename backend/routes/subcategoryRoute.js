import express from "express";
import {
  addSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory
} from "../controllers/subcategoryController.js";

const subcategoryRouter = express.Router();

// 🔸 Add Subcategory
subcategoryRouter.post("/add-subcategory", addSubCategory);

// 🔸 Get all Subcategories (optional: by categoryId)
subcategoryRouter.get("/all-subcategories", getAllSubCategories);

// 🔸 Update Subcategory by ID
subcategoryRouter.put("/update-subcategory/:id", updateSubCategory);

// 🔸 Delete Subcategory by ID
subcategoryRouter.delete("/delete-subcategory/:id", deleteSubCategory);

export default subcategoryRouter;
