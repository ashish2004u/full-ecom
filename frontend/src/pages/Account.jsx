import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      dispatch(setUser(savedUser));
    }
  }, [dispatch]);

  console.log("User from redux:", user);  // Debug

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  if (!user) {
    return <p className="text-center mt-10">Please login to view your account.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">My Account</h2>

      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4 border">
        {/* Profile Info */}
        <div className="flex items-center space-x-4">
          <div className="text-gray-500 text-xl">👤</div>
          <div>
            <p className="text-lg font-medium">{user?.name || "Guest User"}</p>
            <p className="text-gray-500 text-sm">
              User ID: #{user?.id || user?._id || "N/A"}
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-4">
          <div className="text-gray-500 text-xl">📧</div>
          <p className="text-gray-700">{user?.email || "Not available"}</p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center space-x-2"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
