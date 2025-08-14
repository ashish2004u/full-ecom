import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";

import { addSubCategory } from "../redux/slice/subCategorySlice";

const AddSubcategoryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/category/all-category`);
        setCategories(res.data.categories || res.data); // depending on API response
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subcategoryName.trim() || !selectedCategory) {
      toast.error("Please enter subcategory name and select a category.");
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        name: subcategoryName.trim(),
        categoryId: selectedCategory,
      };

      console.log("Sending data to addSubCategory:", dataToSend);

      const resultAction = await dispatch(addSubCategory(dataToSend));

      if (addSubCategory.fulfilled.match(resultAction)) {
        toast.success("Subcategory added successfully!");
        setSubcategoryName("");
        setSelectedCategory("");
        navigate("/subcategories");
      } else {
        console.error("Subcategory add failed:", resultAction);
        toast.error(resultAction.error?.message || "Failed to add subcategory");
      }
    } catch (error) {
      console.error("Caught Error in submit:", error);
      toast.error(
        error.response?.data?.message || error.message || "Failed to add subcategory"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add New Subcategory</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1" htmlFor="subcategoryName">
            Subcategory Name
          </label>
          <input
            id="subcategoryName"
            type="text"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g. Smartphones"
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="categorySelect">
            Select Category
          </label>
          <select
            id="categorySelect"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={loading}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id || cat.id} value={cat._id || cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Subcategory"}
        </button>
      </form>
    </div>
  );
};

export default AddSubcategoryForm;
