import React, { useState, useEffect } from "react";

const EditSubcategoryForm = ({ initialData, categories, onSubmit, loading }) => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setCategoryId(initialData.categoryId?._id || initialData.categoryId || ""); // handle populated or just id
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !categoryId) {
      alert("Please fill both subcategory name and select category.");
      return;
    }

    onSubmit({ name: name.trim(), categoryId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6">
      <div>
        <label className="block font-medium mb-1" htmlFor="name">
          Subcategory Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block font-medium mb-1" htmlFor="categorySelect">
          Select Category
        </label>
        <select
          id="categorySelect"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-2 border rounded"
          required
          disabled={loading}
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
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Subcategory"}
      </button>
    </form>
  );
};

export default EditSubcategoryForm;
