import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("कृपया ईमेल और पासवर्ड भरें");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:4000/api/admin/auth/login",
        formData
      );

      // Backend से आने वाले data को destructure करना
      const { token, user } = res.data;

      if (!token || !user) {
        toast.error("गलत रिस्पॉन्स प्राप्त हुआ");
        return;
      }

      // Token और user info को localStorage में save करना
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role || "");
      localStorage.setItem("name", user.name || "");
      localStorage.setItem("email", user.email || "");

      console.log("Saved role in localStorage:", user.role);

      toast.success("Login सफल!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login असफल रहा");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">🔐 Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
          >
            {loading ? "लॉगिन हो रहा है..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
