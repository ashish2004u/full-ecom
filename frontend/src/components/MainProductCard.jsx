import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";

const MainProductCard = ({ id, name, desc, price, images, sizes }) => {
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
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
  }, [images]); // 👈 jab images update ho tab main image bhi update ho

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image Section */}
      <div className="flex flex-col-reverse md:flex-row    gap-4">
        {/* Thumbnails */}
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

        {/* Main Image */}
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

        {/* Price */}
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold text-gray-900">₹{price}</span>
          <span className="line-through text-gray-400 text-sm">
            ₹{price + 500}
          </span>
          <span className="text-green-500 text-sm font-medium">
            {Math.round(((price + 500 - price) / (price + 500)) * 100)}% off
          </span>
        </div>

        {/* Sizes */}
        <div>
          <p className="font-medium text-gray-600 mb-2">Select Size</p>
          <div className="flex gap-3">
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

        {/* Quantity */}
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

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 text-center bg-[#25D366] text-white rounded-lg hover:bg-[#1ebe5d]"
          >
            📦 Bulk Order Enquiry
          </a>
          <button
            onClick={() => {
              dispatch(
                addToCart({
                  id,
                  name,
                  price,
                  image: mainImage, // ✅ selected main image
                  size: selectedSize, // ✅ selected size
                  qty: quantity, // ✅ selected quantity
                })
              );
            }}
            className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            🛒 Add to Cart
          </button>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-semibold mb-1 text-gray-800">Product Details</h4>
          <p className="text-gray-600 text-sm">{desc}</p>
        </div>

        {/* Material & Care */}
        {/* <div>
          <h4 className="font-semibold mb-1 text-gray-800">Material & Care</h4>
          <ul className="text-gray-600 text-sm list-disc list-inside">
            <li>Cotton</li>
            <li>Machine-wash</li>
          </ul>
        </div> */}

        {/* Seller Info */}
        {/* <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-800">Sold by</h4>
          <p className="text-sm text-blue-600 font-medium">
            Wind It Store, Stillwater
          </p>
          <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
            <li>90% Positive Feedback</li>
            <li>63 Products</li>
            <li>3-month Warranty on All Products</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default MainProductCard;
