import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/slice/cartSlice";

const TotalPrice = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // ✅ Load coupon status from localStorage on mount
  useEffect(() => {
    const applied = localStorage.getItem("isCouponApplied");
    if (applied === "true") {
      setIsCouponApplied(true);
    }
  }, []);

  // ✅ Save to localStorage when coupon applied
  const handleApplyCoupon = () => {
    const validCoupon = "STYLESQUAD10";
    if (isCouponApplied) {
      setCouponError("Coupon already applied.");
    } else if (couponCode === validCoupon) {
      setIsCouponApplied(true);
      localStorage.setItem("isCouponApplied", "true");
      setCouponError('');
    } else {
      setCouponError("Invalid coupon code.");
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const tax = subtotal * 0.05;
  const delivery = 40;
  const discount = isCouponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + tax + delivery - discount;

  return (
    <div className="w-full lg:w-1/3 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Price Summary</h2>

      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Tax (5%)</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Delivery Charges</span>
        <span>₹{delivery}</span>
      </div>
      <div className="flex justify-between mb-2 text-green-600">
        <span>Discount {isCouponApplied ? "(10%)" : ""}</span>
        <span>- ₹{discount.toFixed(2)}</span>
      </div>

      <hr className="my-3" />

      <div className="flex justify-between font-bold text-lg mb-6">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      {/* Coupon Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="w-full border p-2 rounded mb-2 text-sm"
          disabled={isCouponApplied}
        />
        <button
          className="bg-gray-800 text-white w-full py-2 rounded hover:bg-black transition disabled:opacity-50"
          onClick={handleApplyCoupon}
          disabled={isCouponApplied}
        >
          {isCouponApplied ? "Coupon Applied" : "Apply Coupon"}
        </button>
        {couponError && <p className="text-red-500 text-sm mt-1">{couponError}</p>}
      </div>

      <button
        onClick={() => navigate("/place-order")}
        className="bg-black text-white py-2 px-4 w-full rounded hover:bg-gray-800 transition"
      >
        Checkout
      </button>
    </div>
  );
};

export default TotalPrice;
