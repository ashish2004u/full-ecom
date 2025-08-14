import express from "express";
import { login } from "../controllers/adminAuthController.js";

const adminAuthRouter = express.Router();

adminAuthRouter.post("/login", login);

export default adminAuthRouter;
    