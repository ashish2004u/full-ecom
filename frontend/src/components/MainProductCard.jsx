import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";
import toast from "react-hot-toast";

const MainProductCard = ({ id, slug, name, desc, price, images, sizes }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);

  const whatsappNumber = "919999999999";
  const message = encodeURIComponent(
    "Hi! I want to enquire about bulk order for this product."
  );

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    setMainImage(images[0]);
    setSelectedSize(sizes[0] || null); // Default size
  }, [images, sizes]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login first to add items to cart!");
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    dispatch(
      addToCart({
        id, // API aur backend ke liye ID rakhi hai
        slug, // SEO friendly naam
        name,
        price,
        image: mainImage,
        size: selectedSize,
        qty: quantity,
      })
    );

    toast.success("Added to cart!");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image Section */}
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="flex flex-row md:flex-col gap-3 overflow-y-auto max-h-[500px] pr-2">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumbnail ${i}`}
              onClick={() => setMainImage(img)}
              className={`w-20 h-24 object-cover rounded-lg border cursor-pointer transition-all ${
                mainImage === img ? "border-green-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="flex-1">
          <img
            src={mainImage}
            alt={name}
            className="w-full h-[700px] rounded-xl border"
          />
        </div>
      </div>

      {/* Details Section */}
      <div className="space-y-5">
        <h3 className="text-sm text-gray-400 uppercase font-medium">
          Minimal Women Collection
        </h3>
        <h1 className="text-3xl font-bold text-gray-800">{name}</h1>

        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold text-gray-900">₹{price}</span>
          <span className="line-through text-gray-400 text-sm">₹{price + 500}</span>
          <span className="text-green-500 text-sm font-medium">
            {Math.round(((price + 500 - price) / (price + 500)) * 100)}% off
          </span>
        </div>

        <div>
          <p className="font-medium text-gray-600 mb-2">Select Size</p>
          <div className="flex gap-3 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-lg transition-all ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "text-gray-700 bg-white hover:bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium text-gray-600 mb-2">Quantity</p>
          <div className="flex items-center gap-3">
            <button
              onClick={decrementQty}
              className="px-3 py-1 bg-gray-200 text-xl rounded-lg"
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={incrementQty}
              className="px-3 py-1 bg-gray-200 text-xl rounded-lg"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 text-center bg-[#25D366] text-white rounded-lg hover:bg-[#1ebe5d]">
            📦 Bulk Order Enquiry
          </a>
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            🛒 Add to Cart
          </button>
        </div>

        <div>
          <h4 className="font-semibold mb-1 text-gray-800">Product Details</h4>
          <p className="text-gray-600 text-sm">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default MainProductCard;
