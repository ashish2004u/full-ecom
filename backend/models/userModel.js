import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    isVerified: { type: Boolean, default: false },
    otp: String,
    otpExpire: Date,
  }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
