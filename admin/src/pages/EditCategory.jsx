import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import EditCategoryForm from "../components/EditCategoryForm";
import {
  fetchCategories,
  updateCategory,
  selectAllCategory,
  selectCategoryLoading,
  selectCategoryError,
} from "../redux/slice/categorySlice";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(selectAllCategory);
  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);

  React.useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch]);

  const category = categories.find((cat) => cat.id === id || cat._id === id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!category) return <p>Category not found</p>;

  const handleSubmit = async (formData) => {
    try {
      const resultAction = await dispatch(updateCategory({ id, formData }));
      if (updateCategory.fulfilled.match(resultAction)) {
        toast.success("Category updated successfully!");
        navigate("/categories");
      } else {
        toast.error("Failed to update category: " + (resultAction.payload || "Unknown error"));
      }
    } catch (err) {
      toast.error("Error updating category: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <EditCategoryForm initialData={category} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditCategory;
