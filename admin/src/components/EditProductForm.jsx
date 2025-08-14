import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { backendUrl } from "../App";

const EditProductForm = ({ initialData, onSubmit, loading }) => {
  const sizeDropdownRef = useRef(null);

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
  const [images, setImages] = useState([]); // New images to upload
  const [oldImages, setOldImages] = useState([]); // Existing images
  const [previews, setPreviews] = useState([]); // Previews for new images
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);

  const sizes = [
    "24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "46", "48",
    "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL", "Free Size", "All Size",
  ];

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/category/all-category`);
        const data = await res.json();
        setCategories(data);
      } catch {
        toast.error("Error fetching categories");
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories on category change
  useEffect(() => {
    if (!productData.category) {
      setSubcategories([]);
      setProductData(prev => ({ ...prev, subcategory: "" }));
      return;
    }

    const fetchSubcategories = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/subcategory/all-subcategories?categoryId=${productData.category}`);
        const data = await res.json();
        setSubcategories(data.subCategories || []);
      } catch {
        toast.error("Error fetching subcategories");
      }
    };
    fetchSubcategories();
  }, [productData.category]);

  // Prefill form when initialData changes
  useEffect(() => {
    if (initialData) {
      setProductData({
        name: initialData.name || "",
        desc: initialData.desc || "",
        price: initialData.price || "",
        category: initialData.category?._id || "",
        subcategory: initialData.subcategory?._id || "",
        bestseller: initialData.bestseller ? "Yes" : "No",
        sku: initialData.sku || "",
        inventory: initialData.inventory || "",
      });
      setSelectedSizes(initialData.sizes || []);
      setOldImages(initialData.images || []);
      setPreviews([]);
      setImages([]);
    }
  }, [initialData]);

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

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      toast.error("You can upload up to 5 images only.");
      return;
    }

    setImages(files);
    setPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    if (selectedSizes.length === 0) {
      toast.error("Please select at least one size.");
      return;
    }

    // Validate required fields
    if (!productData.name.trim()) {
      toast.error("Product name is required.");
      return;
    }
    if (!productData.price || productData.price <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }
    if (!productData.category) {
      toast.error("Please select a category.");
      return;
    }
    if (!productData.subcategory) {
      toast.error("Please select a subcategory.");
      return;
    }
    if (productData.inventory === "" || productData.inventory < 0) {
      toast.error("Please enter valid inventory.");
      return;
    }

    const dataToSubmit = {
      ...productData,
      bestseller: productData.bestseller === "Yes",
      sizes: selectedSizes,
      oldImages,
      images,
    };

    if (onSubmit) onSubmit(dataToSubmit);
  };

  return (
    <form className="p-8" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Product Name"
          required
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Selling Price"
          min="0"
          step="0.01"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Subcategory */}
        <select
          name="subcategory"
          value={productData.subcategory}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
          disabled={!productData.category}
        >
          <option value="">-- Select Subcategory --</option>
          {subcategories.map(sub => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>

        {/* Bestseller */}
        <select
          name="bestseller"
          value={productData.bestseller}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* Sizes Dropdown */}
        <div className="relative" ref={sizeDropdownRef}>
          <label className="block font-medium mb-2">Available Sizes</label>
          <div
            className="border rounded px-3 py-2 bg-white cursor-pointer"
            onClick={() => setSizeDropdownOpen(!sizeDropdownOpen)}
          >
            {selectedSizes.length > 0 ? selectedSizes.join(", ") : "Select sizes"}
          </div>
          {sizeDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full border bg-white shadow rounded max-h-60 overflow-y-auto">
              {sizes.map(size => (
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

        {/* SKU */}
        <input
          type="text"
          name="sku"
          value={productData.sku}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="SKU"
        />

        {/* Inventory */}
        <input
          type="number"
          name="inventory"
          value={productData.inventory}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Inventory"
          min="0"
          required
        />

        {/* Description */}
        <textarea
          name="desc"
          value={productData.desc}
          onChange={handleInputChange}
          className="w-full p-2 border rounded md:col-span-2"
          rows={4}
          placeholder="Product Description"
        />

        {/* Images Section */}
        <div className="md:col-span-2">
          <label className="block font-medium">Replace Product Images (optional)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mt-2"
          />

          {/* Old Images with Remove Button */}
          {oldImages.length > 0 && (
            <div className="flex gap-3 mt-3 flex-wrap">
              {oldImages.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={
                      img.startsWith("http")
                        ? img
                        : `${backendUrl.replace(/\/$/, "")}/${img.replace(/^\/+/, "")}`
                    }
                    alt="Old Product"
                    className="w-24 h-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => setOldImages(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute top-0 right-0 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm"
                    title="Remove Image"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* New Image Previews */}
          {previews.length > 0 && (
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
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Update Product"}
      </button>
    </form>
  );
};

export default EditProductForm;
