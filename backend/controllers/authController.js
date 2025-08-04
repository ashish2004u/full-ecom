import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendOtp from "../utils/sendOtp.js";

// OTP generate karne ka function
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// ==============================
//   REGISTER CONTROLLER
// ==============================
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    if (existingUser.isVerified) {
      return res.status(400).json({ msg: "User already exists" });
    } else {
      if (existingUser.otpExpire < Date.now()) {
        await UserModel.deleteOne({ email });
      } else {
        return res.status(400).json({ msg: "Please verify your OTP first" });
      }
    }
  }

  const otp = generateOtp();
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserModel({
    name,
    email,
    password: hashedPassword,
    otp,
    otpExpire: Date.now() + 2 * 60 * 1000,
    isVerified: false,
  });

  await user.save();
  await sendOtp(email, otp);

  res.json({ msg: "OTP sent to your email" });
};

// ==============================
//   VERIFY OTP CONTROLLER
// ==============================
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  if (!user.otp || String(user.otp) !== String(otp)) {
    return res.status(400).json({ msg: "Invalid OTP" });
  }

  if (user.otpExpire < Date.now()) {
    return res.status(400).json({ msg: "OTP expired" });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpire = null;
  await user.save();

  res.json({ msg: "OTP verified successfully. You can now login." });
};

// ==============================
//   LOGIN CONTROLLER
// ==============================
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  if (!user.isVerified)
    return res.status(403).json({ msg: "Please verify your email first" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    },
  });
};

// ==============================
//   RESEND OTP CONTROLLER
// ==============================
export const resendOtp = async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  if (user.isVerified) {
    return res.status(400).json({ msg: "User is already verified" });
  }

  const newOtp = generateOtp();
  user.otp = newOtp;
  user.otpExpire = Date.now() + 2 * 60 * 1000; // 2 minutes
  await user.save();

  await sendOtp(email, newOtp);

  res.json({ msg: "New OTP sent to your email" });
};

// ==============================
//   FORGOT PASSWORD OTP
// ==============================
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) return res.status(404).json({ msg: "User not found" });

  const otp = generateOtp();
  user.otp = otp;
  user.otpExpire = Date.now() + 2 * 60 * 1000; // 2 minutes
  await user.save();

  await sendOtp(email, otp);

  res.json({ msg: "OTP sent for password reset" });
};

// ==============================
//   VERIFY FORGOT OTP
// ==============================
export const verifyForgotOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  if (!user.otp || String(user.otp) !== String(otp)) {
    return res.status(400).json({ msg: "Invalid OTP" });
  }

  if (user.otpExpire < Date.now()) {
    return res.status(400).json({ msg: "OTP expired" });
  }

  user.otp = null;
  user.otpExpire = null;
  await user.save();

  res.json({ msg: "OTP verified. You may now reset your password." });
};

// ==============================
//   RESET PASSWORD
// ==============================
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optional extra check to prevent unauthorized resets
    if (user.otp || user.otpExpire) {
      return res.status(400).json({ message: "OTP verification required before password reset" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
