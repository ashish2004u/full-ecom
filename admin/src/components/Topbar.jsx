import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  // localStorage से नाम और ईमेल
  const userName = localStorage.getItem("name") || "User";
  const userEmail = localStorage.getItem("email") || "";
  const storedImage = localStorage.getItem("profileImage");
  const initial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, [storedImage]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("profileImage");
    navigate("/admin-login");
  };

  return (
    <div className="ml-64 bg-white shadow px-6 py-4 flex justify-between items-center">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Profile Section */}
      <div
        className="relative flex items-center gap-3 cursor-pointer"
        onMouseEnter={() => setShowLogout(true)}
        onMouseLeave={() => setShowLogout(false)}
      >
        {/* Name + Email */}
        <div className="flex flex-col text-right">
          <span className="font-medium">{userName}</span>
          {userEmail && (
            <span className="text-xs text-gray-500">{userEmail}</span>
          )}
        </div>

        {/* Avatar */}
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg select-none">
            {initial}
          </div>
        )}

        {/* Logout Dropdown */}
        {showLogout && (
          <div className="absolute top-12 right-0 bg-white border rounded shadow px-4 py-2 text-sm z-10 hover:bg-gray-100 transition">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
