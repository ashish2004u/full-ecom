import React, { useEffect, useState } from "react";

const EditCategoryForm = ({ initialData, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    image: null, // New selected file
  });

  const [existingImage, setExistingImage] = useState(null); // Existing image from DB
  const [preview, setPreview] = useState(null); // New uploaded preview

  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({
        ...prev,
        name: initialData.name || "",
        image: null, // No file selected initially
      }));

      setExistingImage(initialData.image || null); // URL from backend
      setPreview(null); // Clear preview if new initialData comes
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setExistingImage(null); // Hide old image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name) {
      alert("Category name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    if (form.image) {
      formData.append("image", form.image); // Only append new image if selected
    } else if (existingImage) {
      formData.append("existingImage", existingImage); // Optional: for backend use
    }

    onSubmit && onSubmit(formData);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Edit Category</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Name */}
        <div>
          <label className="block font-medium">Category Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
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

          {/* Show New Preview */}
          {preview && (
            <img
              src={preview}
              alt="New Preview"
              className="w-32 h-32 mt-2 object-cover rounded border"
            />
          )}

          {/* Show Existing Image */}
          {!preview && existingImage && (
            <img
              src={existingImage}
              alt="Existing"
              className="w-32 h-32 mt-2 object-cover rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCategoryForm;
