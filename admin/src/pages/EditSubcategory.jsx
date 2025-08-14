import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  fetchSubCategories,
  updateSubCategory,
  selectAllSubCategory,
  selectUpdateLoading,
} from "../redux/slice/subCategorySlice";

import axios from "axios";
import { backendUrl } from "../App";

import EditSubcategoryForm from "../components/EditSubcategoryForm";

const EditSubcategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subcategories = useSelector(selectAllSubCategory);
  const updateLoading = useSelector(selectUpdateLoading);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Load categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await axios.get(`${backendUrl}/api/category/all-category`);
        setCategories(res.data.categories || res.data);
      } catch (error) {
        toast.error("Failed to fetch categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Ensure subcategories are loaded
  useEffect(() => {
    if (!subcategories.length) {
      dispatch(fetchSubCategories());
    }
  }, [dispatch, subcategories.length]);

  const subcategory = subcategories.find((sub) => sub._id === id || sub.id === id);

  if (!subcategory) return <p className="p-6">Loading subcategory details...</p>;
  if (loadingCategories) return <p className="p-6">Loading categories...</p>;

  const handleSubmit = async (updatedData) => {
    try {
      const resultAction = await dispatch(updateSubCategory({ id, data: updatedData }));
      if (updateSubCategory.fulfilled.match(resultAction)) {
        toast.success("Subcategory updated successfully!");
        navigate("/subcategories");
      } else {
        toast.error(resultAction.error?.message || "Failed to update subcategory");
      }
    } catch (error) {
      toast.error("Error updating subcategory: " + error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Subcategory</h1>
      <EditSubcategoryForm
        initialData={subcategory}
        categories={categories}
        onSubmit={handleSubmit}
        loading={updateLoading}
      />
    </div>
  );
};

export default EditSubcategory;
