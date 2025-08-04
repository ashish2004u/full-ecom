import React from "react";
import Title from "../components/Title";
import CartCard from "../components/CartCard";
import TotalPrice from "../components/TotalPrice";
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/slice/cartSlice";

const CartPage = () => {
  const cartItems = useSelector(selectCartItems) || [];


  return (
    <div className="p-4 sm:p-6 md:p-10 min-h-[60vh] bg-gray-50">
      <Title
        text1="Shopping"
        text2="Cart"
        className="mb-10 sm:mb-16 md:mb-20"
      />

      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center h-[40vh]">
          <p className="text-xl sm:text-2xl font-semibold text-gray-500">
            Your cart is empty 🛒
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT: Cart Table */}
          <div className="w-full lg:w-2/3 overflow-x-auto">
            <table className="min-w-[600px] w-full border text-sm sm:text-base bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">S.No</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Size</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <CartCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    size={item.size}
                    qty={item.qty}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT: Price Summary */}
          <TotalPrice />
        </div>
      )}
    </div>
  );
};

export default CartPage;
