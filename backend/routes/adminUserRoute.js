import express from "express";
import {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/adminUserController.js";
import { protect, isAdmin } from "../middleware/adminAuth.js";

const adminUserRouter = express.Router();

adminUserRouter.get("/all-users", protect, isAdmin, getUsers);
adminUserRouter.get("/all-users/:id", protect, isAdmin, getUserById); // ✅ नया route

adminUserRouter.post("/add-user", protect, isAdmin, addUser);
adminUserRouter.put("/update-user/:id", protect, isAdmin, updateUser);
adminUserRouter.delete("/delete-user/:id", protect, isAdmin, deleteUser);

export default adminUserRouter;
