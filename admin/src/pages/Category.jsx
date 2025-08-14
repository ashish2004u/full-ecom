import React, { useEffect } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  selectAllCategory,
  selectCategoryLoading,
  selectCategoryError,
} from "../redux/slice/categorySlice";
import CategoryList from "../components/ListCategory";

const CategoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector(selectAllCategory);
  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="p-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        {/* Search Input (add logic later) */}
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 outline-none focus:ring-2 focus:ring-purple-500"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>

        {/* Add Category Button */}
        <button
          onClick={() => navigate("/add-category")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      {/* Status & Category List */}
      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && !error && <CategoryList categories={categories} />}
    </div>
  );
};

export default CategoryPage;
