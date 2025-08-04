import React, { useState } from "react";
import { FaSearchPlus, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import slugify from "../utils/slugify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";
import toast from "react-hot-toast";

const ProductCard = ({ id, name, price, image, sizes = [] }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log("User from redux:", user);

  const [showIcons, setShowIcons] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login first to add items to cart!");
      setShowSizeModal(false);
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    dispatch(
      addToCart({
        id,
        name,
        price,
        image,
        qty: 1,
        size: selectedSize,
      })
    );

    toast.success("Added to cart!");
    setShowSizeModal(false);
    setSelectedSize(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    toast.success(`Size selected: ${size}`);
  };

  return (
    <>
      <div
        className="w-auto border rounded-lg shadow-md group relative bg-white"
        onMouseEnter={() => setShowIcons(true)}
        onMouseLeave={() => setShowIcons(false)}
      >
        <div className="relative w-full h-80 overflow-hidden rounded-t-lg">
          <Link to={`/main-product?name=${slugify(name)}`}>
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          {showIcons && (
            <div className="absolute top-3 right-3 flex flex-col gap-3 animate-slide-in-right">
              <button
                onClick={() => setShowZoom(true)}
                className="bg-white p-2.5 rounded-full shadow hover:bg-gray-200 cursor-pointer"
              >
                <FaSearchPlus size={16} />
              </button>
              <button
                onClick={() => setShowSizeModal(true)}
                className="bg-white p-2.5 rounded-full shadow hover:bg-gray-200 cursor-pointer"
              >
                <FaShoppingCart size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="p-5">
          <Link to={`/main-product?name=${slugify(name)}`}>
            <p className="text-xl font-semibold">{name}</p>
          </Link>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm line-through text-gray-500">
              ₹{price + 200}
            </span>
            <span className="text-xl font-bold text-green-600">₹{price}</span>
          </div>

          <button
            onClick={() => setShowSizeModal(true)}
            className="mt-5 w-full bg-black text-white py-2.5 rounded hover:bg-gray-800 cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {showZoom && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50"
          onClick={() => setShowZoom(false)}
        >
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <img src={image} alt={name} className="w-full rounded" />
            <p className="mt-3 text-center text-lg font-semibold">{name}</p>
          </div>
        </div>
      )}

      {showSizeModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Select Size</h2>
            <div className="flex gap-3 mb-5 flex-wrap">
              {sizes.length === 0 && (
                <p className="text-red-500">
                  No sizes available for this product.
                </p>
              )}
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSizeModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
