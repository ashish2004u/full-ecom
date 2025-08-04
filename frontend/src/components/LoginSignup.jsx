import React, { useState, useEffect } from "react";
import OTPModal from "./OTPModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../redux/slice/authSlice";

const AuthForm = () => {
  const dispatch = useDispatch();

  const [currentState, setCurrentState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [signupPendingData, setSignupPendingData] = useState(null);
  const [forgotFlow, setForgotFlow] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const isLogin = currentState === "login";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const switchState = () => {
    setCurrentState(isLogin ? "signup" : "login");
    setName("");
    setEmail("");
    setPassword("");
    setOtp("");
    setShowOtpModal(false);
    setSignupPendingData(null);
    setForgotFlow(false);
    setShowResetForm(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (forgotFlow) {
      try {
        await axios.post("http://localhost:4000/api/forgot-password", {
          email,
        });
        setShowOtpModal(true);
        toast.success("OTP sent to your email for password reset!");
      } catch (err) {
        toast.error(err?.response?.data?.msg || "Failed to send OTP");
      }
    } else if (isLogin) {
      try {
        const res = await axios.post("http://localhost:4000/api/login", {
          email,
          password,
        });

        const { token, user } = res.data;
        dispatch(setUser(user));
        dispatch(setToken(token));
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(`Welcome, ${user.name}!`);
        navigate("/");
      } catch (err) {
        toast.error(err?.response?.data?.msg || "Login failed");
      }
    } else {
      try {
        await axios.post("http://localhost:4000/api/register", {
          name,
          email,
          password,
        });

        setSignupPendingData({ name, email, password });
        setShowOtpModal(true);
        toast.success("OTP sent to your email!");
      } catch (err) {
        toast.error(err?.response?.data?.msg || "Signup failed");
      }
    }

    setLoading(false);
  };

  const handleOtpVerify = async () => {
    if (!otp) return toast.error("Please enter OTP");

    try {
      if (forgotFlow) {
        await axios.post("http://localhost:4000/api/verify-forgot-otp", {
          email,
          otp,
        });

        setShowOtpModal(false);
        setShowResetForm(true);
        toast.success("OTP verified! Now reset your password.");
      } else {
        await axios.post("http://localhost:4000/api/verify", {
          email: signupPendingData?.email || email,
          otp,
        });

        toast.success("Signup verified! You can now log in.");
        setSignupPendingData(null);
        setCurrentState("login");
        setShowOtpModal(false);
        setOtp("");
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Invalid or expired OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      const route = forgotFlow ? "forgot-password" : "resend-otp";
      await axios.post(`http://localhost:4000/api/${route}`, {
        email: signupPendingData?.email || email,
      });
      toast.success("OTP resent to your email");
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Failed to resend OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return toast.error("Please fill in all password fields");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      await axios.post("http://localhost:4000/api/reset-password", {
        email,
        password: newPassword,
      });

      toast.success("Password reset successful. You can now log in.");
      setShowResetForm(false);
      setForgotFlow(false);
      setCurrentState("login");
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Password reset failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        {showResetForm
          ? "Set a new password"
          : forgotFlow
          ? "Reset your password"
          : isLogin
          ? "Login to your account"
          : "Create a new account"}
      </h2>

      {/* 🔒 Reset Password Form */}
      {showResetForm ? (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            required
            className="w-full border px-3 py-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            required
            className="w-full border px-3 py-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </form>
      ) : (
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {!isLogin && !forgotFlow && (
            <input
              type="text"
              required
              placeholder="Your Name"
              className="w-full border px-3 py-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            required
            placeholder="Email Address"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!forgotFlow && (
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading
              ? "Please wait..."
              : forgotFlow
              ? "Send OTP"
              : isLogin
              ? "Login"
              : "Signup"}
          </button>

          {isLogin && !forgotFlow && (
            <p
              className="text-right text-sm text-blue-600 cursor-pointer"
              onClick={() => {
                setForgotFlow(true);
                setShowOtpModal(false);
                setPassword("");
              }}
            >
              Forgot Password?
            </p>
          )}
        </form>
      )}

      {!showResetForm && (
        <p className="text-center mt-4 text-sm text-gray-600">
          {forgotFlow
            ? "Remembered your password?"
            : isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button onClick={switchState} className="text-blue-600 underline">
            {forgotFlow ? "Login" : isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <OTPModal
          otp={otp}
          setOtp={setOtp}
          onClose={() => setShowOtpModal(false)}
          onVerify={handleOtpVerify}
          onResend={handleResendOtp}
        />
      )}
    </div>
  );
};

export default AuthForm;
