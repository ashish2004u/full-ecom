import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    id: "", // 👈 required in backend
    name: "",
    desc: "", // 👈 match backend field name
    price: "",
    category: "",
    subcategory: "",
    bestseller: "No",
    sku: "",
    inventory: "", // 👈 backend me quantity ka naam inventory hai
  });

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("sizes", selectedSizes.join(",")); // Backend expects CSV
    formData.append("bestseller", productData.bestseller === "Yes");

    images.forEach((img) => formData.append("images", img));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/add-product`,
        formData
      );
      alert("✅ Product added successfully!");
console.log("✔ Response:", JSON.stringify(res.data, null, 2));
    } catch (error) {
      alert("❌ Failed to add product");
      console.error("❌ Error:", error);
    }
  };

  return (
    <form className="p-8" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium">Product ID</label>
          <input
            type="text"
            name="id"
            value={productData.id}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Selling Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
            required
          >
            <option value="">-- Select Category --</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Subcategory</label>
          <select
            name="subcategory"
            value={productData.subcategory}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
          >
            <option>Smartwatch</option>
            <option>Clothing</option>
            <option>Kitchen</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Bestseller</label>
          <select
            name="bestseller"
            value={productData.bestseller}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Available Sizes</label>
          <div className="flex gap-4 mt-2">
            {sizes.map((size) => (
              <label key={size} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleSizeToggle(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Inventory (Quantity)</label>
          <input
            type="number"
            name="inventory"
            value={productData.inventory}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium">Product Description</label>
          <textarea
            name="desc"
            value={productData.desc}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded"
            rows={4}
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium">Product Images (2-6)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mt-2"
            required
          />
          <div className="flex gap-3 mt-3 flex-wrap">
            {previews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx + 1}`}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Save Product
      </button>
    </form>
  );
};

export default AddProduct;
