import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchSubCategories,
  selectAllSubCategory,
} from "../redux/slice/subCategorySlice";

import SubcategoryList from "../components/ListSubcategory";

const SubcategoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subcategories = useSelector(selectAllSubCategory);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchSubCategories());
  }, [dispatch]);

  // Filter subcategories based on search term (case-insensitive)
  const filteredSubcategories = subcategories.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search subcategories..."
            className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>

        <button
          onClick={() => navigate("/add-subcategory")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus /> Add Subcategory
        </button>
      </div>

      {/* Subcategory List with filtered data */}
      <SubcategoryList subcategories={filteredSubcategories} />
    </div>
  );
};

export default SubcategoryPage;
