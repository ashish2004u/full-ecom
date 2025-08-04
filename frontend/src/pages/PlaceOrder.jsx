import React from "react";
import Title from "../components/Title";

const PlaceOrder = () => {
  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <Title text1={'Place'} text2={'Orders'}/>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Form */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Shipping Address"
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
            ></textarea>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full md:w-96 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹999</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>₹50</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges:</span>
              <span>₹30</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹1079</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-6">
            <h3 className="text-md font-medium mb-2">Select Payment Method</h3>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="cod" defaultChecked />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="razorpay" />
                Razorpay
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="stripe" />
                Stripe
              </label>
            </div>
            <button className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
