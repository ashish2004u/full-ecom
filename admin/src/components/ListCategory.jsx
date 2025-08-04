import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Props-based CategoryList
const CategoryList = ({ categories }) => {
    const navigate = useNavigate();
  
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
              <tr key={cat.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{cat.id}</td>
                <td className="px-4 py-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 font-medium">{cat.name}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                     onClick={() => navigate(`/edit-category/${cat.id}`)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    
                  >
                    <FaTrash />
                  </button>
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
