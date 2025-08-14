import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";

const AddCategoryForm = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImage) {
      toast.error("Please enter a name and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", categoryImage);

    try {
      setLoading(true);
      const res = await axios.post(
        `${backendUrl}/api/category/add-category`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success === false) {
        toast.error(res.data.message || "Failed to add category.");
      } else {
        toast.success("Category added successfully!");
        setCategoryName("");
        setCategoryImage(null);
        navigate("/categories"); // <--- Redirect here

        e.target.reset();
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Error adding category.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md ">
      <h2 className="text-2xl font-semibold mb-6">Add New Category</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        <div>
          <label className="block font-medium">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 mt-1 border rounded"
            placeholder="e.g. Electronics"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block font-medium">Category Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
