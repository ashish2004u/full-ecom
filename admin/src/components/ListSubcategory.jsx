import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { deleteSubCategory } from "../redux/slice/subCategorySlice";

const SubcategoryList = ({ subcategories }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!Array.isArray(subcategories) || subcategories.length === 0) {
    return <p>No subcategories found.</p>;
  }

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete subcategory "${name}"?`);
    if (!confirmed) return;

    try {
      const resultAction = await dispatch(deleteSubCategory(id));
      if (deleteSubCategory.fulfilled.match(resultAction)) {
        toast.success(`Subcategory "${name}" deleted successfully!`);
      } else {
        toast.error(resultAction.error?.message || "Failed to delete subcategory.");
      }
    } catch (error) {
      toast.error("Error deleting subcategory: " + error.message);
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Subcategory Name</th>
              <th className="px-4 py-3 text-left">Category Name</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((sub) => (
              <tr key={sub._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 break-all">{sub._id}</td>
                <td className="px-4 py-3">{sub.name}</td>
                <td className="px-4 py-3">{sub.categoryId?.name || "N/A"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => navigate(`/edit-subcategory/${sub._id}`)}
                      aria-label={`Edit ${sub.name}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(sub._id, sub.name)}
                      aria-label={`Delete ${sub.name}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubcategoryList;
