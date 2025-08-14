import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  selectAddLoading,
  selectAddError,
  selectAddSuccess,
  clearAddStatus
} from "../redux/slice/productSlice";
import { backendUrl } from "../App";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector(selectAddLoading);
  const error = useSelector(selectAddError);
  const success = useSelector(selectAddSuccess);

  const [productData, setProductData] = useState({
    name: "",
    desc: "",
    price: "",
    category: "",
    subcategory: "",
    bestseller: "No",
    sku: "",
    inventory: "",
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);

  const sizeDropdownRef = useRef(null);

  const sizes = [
    "24","26","28","30","32","34","36","38","40","42","44","46","48",
    "S","M","L","XL","XXL","3XL","4XL","5XL","6XL","Free Size","All Size"
  ];

  // Fetch categories
  useEffect(() => {
    axios.get(`${backendUrl}/api/category/all-category`)
      .then((res) => setCategories(res.data))
      .catch(() => toast.error("Error fetching categories"));
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (!productData.category) {
      setSubcategories([]);
      return;
    }
    axios.get(`${backendUrl}/api/subcategory/all-subcategories?categoryId=${productData.category}`)
      .then((res) => setSubcategories(res.data.subCategories || []))
      .catch(() => toast.error("Error fetching subcategories"));
  }, [productData.category]);

  // Close size dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sizeDropdownRef.current && !sizeDropdownRef.current.contains(event.target)) {
        setSizeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Success handling
  useEffect(() => {
    if (success) {
      toast.success("✅ Product added successfully!");
      resetForm();
      dispatch(clearAddStatus());
      navigate("/products");
    }
  }, [success, navigate, dispatch]);

  // Error handling
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAddStatus());
    }
  }, [error, dispatch]);

  const resetForm = () => {
    setProductData({
      name: "",
      desc: "",
      price: "",
      category: "",
      subcategory: "",
      bestseller: "No",
      sku: "",
      inventory: "",
    });
    setSelectedSizes([]);
    setImages([]);
    setPreviews([]);
  };

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

    if (files.length < 2 || files.length > 5) {
      toast.error("Please upload between 2 and 5 images.");
      return;
    }

    setImages(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    if (images.length < 2 || images.length > 5) {
      toast.error("Please upload between 2 and 5 images.");
      return;
    }

    if (selectedSizes.length === 0) {
      toast.error("Please select at least one size.");
      return;
    }

    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.set("bestseller", productData.bestseller === "Yes");
    formData.append("sizes", JSON.stringify(selectedSizes));
    images.forEach((img) => formData.append("images", img));

    dispatch(addProduct(formData));
  };

  return (
    <form className="p-8" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Product Name"
          required
        />

        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Selling Price"
          required
        />

        <select
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          name="subcategory"
          value={productData.subcategory}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
          disabled={!productData.category}
        >
          <option value="">-- Select Subcategory --</option>
          {subcategories.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>

        <select
          name="bestseller"
          value={productData.bestseller}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <div className="relative" ref={sizeDropdownRef}>
          <label className="block font-medium mb-2">Available Sizes</label>
          <div
            className="border rounded px-3 py-2 bg-white cursor-pointer"
            onClick={() => setSizeDropdownOpen(!sizeDropdownOpen)}
          >
            {selectedSizes.length > 0
              ? selectedSizes.join(", ")
              : "Select sizes"}
          </div>
          {sizeDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full border bg-white shadow rounded max-h-60 overflow-y-auto">
              {sizes.map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-purple-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeToggle(size)}
                  />
                  {size}
                </label>
              ))}
            </div>
          )}
        </div>

        <input
          type="text"
          name="sku"
          value={productData.sku}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="SKU"
        />

        <input
          type="number"
          name="inventory"
          value={productData.inventory}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Inventory"
          required
        />

        <textarea
          name="desc"
          value={productData.desc}
          onChange={handleInputChange}
          className="w-full p-2 border rounded md:col-span-2"
          rows={4}
          placeholder="Product Description"
        />

        <div className="md:col-span-2">
          <label className="block font-medium">
            Product Images (2–5 allowed)
          </label>
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
        disabled={loading}
        className="mt-8 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
};

export default AddProduct;
