// routes/categoryRoutes.js
import express from "express";
import upload from "../middleware/multer.js";
import {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/add-category",upload.single("image"), addCategory);
categoryRouter.get("/all-category", getAllCategories);
categoryRouter.put("/update-category/:id", upload.single("image"),updateCategory);
categoryRouter.delete("/delete-category/:id", deleteCategory);

export default categoryRouter;
