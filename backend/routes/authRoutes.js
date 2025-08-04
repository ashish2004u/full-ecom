import express from "express";
import {
  register,
  verifyOtp,
  login,
  resendOtp,
  forgotPassword,
  verifyForgotOtp,
  resetPassword,
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ✅ Public Routes
router.post("/register", register);
router.post("/verify", verifyOtp);
router.post("/resend-otp", resendOtp); // ✅ new route
router.post("/login", login);
router.post("/forgot-password",forgotPassword);
router.post("/verify-forgot-otp",verifyForgotOtp);
router.post("/reset-password",resetPassword);

// 🔒 Protected Route Example
router.get("/cart", auth, (req, res) => {
  res.json({ msg: "Cart data (protected route)" });
});

export default router;
