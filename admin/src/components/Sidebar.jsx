// src/components/Sidebar.jsx
import React from "react";
import {
  FaTachometerAlt,
  FaThList,
  FaShoppingCart,
  FaEnvelope,
  FaClipboardList,
  FaCheckCircle,
  FaUndoAlt,   // Return Order Icon
  FaBan        // Cancel Order Icon
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#111827] text-white h-screen fixed left-0 top-0 p-6">
      {/* Logo */}
      <div className="mb-10">
        <img src="/your-logo.png" alt="Logo" className="h-10 mx-auto" />
      </div>

      <nav className="space-y-6">
        <Link to="/" className="flex items-center gap-3 hover:text-purple-400">
          <FaTachometerAlt /> Home
        </Link>
        <Link to="/products" className="flex items-center gap-3 hover:text-purple-400">
          <FaShoppingCart /> Products
        </Link>
        <Link to="/categories" className="flex items-center gap-3 hover:text-purple-400">
          <FaThList /> Categories
        </Link>
        <Link to="/newsletter" className="flex items-center gap-3 hover:text-purple-400">
          <FaEnvelope /> Newsletter
        </Link>
         <Link to="/review" className="flex items-center gap-3 hover:text-purple-400">
          <FaEnvelope /> Review
        </Link>

        {/* Orders Section
        <Link to="/ongoing-orders" className="flex items-center gap-3 hover:text-purple-400">
          <FaClipboardList /> Ongoing Orders
        </Link>
        <Link to="/completed-orders" className="flex items-center gap-3 hover:text-purple-400">
          <FaCheckCircle /> Completed Orders
        </Link>
        <Link to="/return-orders" className="flex items-center gap-3 hover:text-purple-400">
          <FaUndoAlt /> Return Orders
        </Link>
        <Link to="/cancel-orders" className="flex items-center gap-3 hover:text-purple-400">
          <FaBan /> Cancel Orders
        </Link> */}
      </nav>
    </div>
  );
};

export default Sidebar;
