import React, { useState } from "react";

const Topbar = () => {
  const [showLogout, setShowLogout] = useState(false);

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
        className="relative flex items-center gap-2 cursor-pointer"
        onMouseEnter={() => setShowLogout(true)}
        onMouseLeave={() => setShowLogout(false)}
      >
        <span className="font-medium">Joseph William</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />

        {/* Logout Dropdown */}
        {showLogout && (
          <div className="absolute top-14 right-0 bg-white border rounded shadow px-4 py-2 text-sm z-10 hover:bg-gray-100 transition">
            <button onClick={() => alert("Logged out")}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
