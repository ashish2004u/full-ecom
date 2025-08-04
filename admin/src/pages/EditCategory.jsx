import React from "react";
import { useParams } from "react-router-dom";
import { categoryData } from "../data/categoryData";
import EditCategoryForm from "../components/EditCategoryForm";

const EditCategory = () => {
  const { id } = useParams();

  // Get the specific category using the URL id param
  const category = categoryData.find((cat) => cat.id === id);

  if (!category) {
    return <p>Category not found</p>;
  }

  const handleSubmit = (formData) => {
    console.log("Updated Category Data:", formData);
    // You can now send formData to backend or update state
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <EditCategoryForm initialData={category} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditCategory;
