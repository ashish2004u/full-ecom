import React, { useState } from "react";

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImage) {
      alert("Please enter a name and select an image.");
      return;
    }

    // FormData to send to backend (optional)
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", categoryImage);

    console.log("Category Name:", categoryName);
    console.log("Selected Image:", categoryImage);

    // You can send `formData` to your backend using fetch or axios here
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Category</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Name */}
        <div>
          <label className="block font-medium">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 mt-1 border rounded"
            placeholder="e.g. Electronics"
          />
        </div>

        {/* Category Image */}
        <div>
          <label className="block font-medium">Category Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Save Category
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
