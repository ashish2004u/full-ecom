// redux/slice/otpSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  otpSent: false,
  otpVerified: false,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setOtpEmail(state, action) {
      state.email = action.payload;
    },
    setOtpSent(state, action) {
      state.otpSent = action.payload;
    },
    setOtpVerified(state, action) {
      state.otpVerified = action.payload;
    },
    resetOtp(state) {
      state.email = "";
      state.otpSent = false;
      state.otpVerified = false;
    },
  },
});

export const {
  setOtpEmail,
  setOtpSent,
  setOtpVerified,
  resetOtp,
} = otpSlice.actions;

export default otpSlice.reducer;
