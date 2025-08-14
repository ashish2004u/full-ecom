import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast"; // <-- import toast
import { deleteCategory } from "../redux/slice/categorySlice";

const CategoryList = ({ categories }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!Array.isArray(categories) || categories.length === 0) {
    return <p>No categories found.</p>;
  }

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete category "${name}"?`);
    if (!confirmed) return;

    try {
      const resultAction = await dispatch(deleteCategory(id));
      if (deleteCategory.fulfilled.match(resultAction)) {
        toast.success(`Category "${name}" deleted successfully!`);
      } else {
        toast.error(resultAction.payload || "Failed to delete category.");
      }
    } catch (error) {
      toast.error("Error deleting category: " + error.message);
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id || cat._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{cat.id || cat._id}</td>
                <td className="px-4 py-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 font-medium">{cat.name}</td>
                <td className="px-4 py-3 ">
                  <div className="flex items-center gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => navigate(`/edit-category/${cat.id || cat._id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(cat.id || cat._id, cat.name)}
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

export default CategoryList;
