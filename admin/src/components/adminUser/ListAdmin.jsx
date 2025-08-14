import React from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminUserList = ({ users = [], onDeleteUser, onRefresh }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full mt-4">
      {/* Add User Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => navigate("/add-admin")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          <FaPlus /> नया यूज़र जोड़ें
        </button>
      </div>

      {/* Users Table or No Users Message */}
      {!Array.isArray(users) || users.length === 0 ? (
        <p className="text-center text-gray-500">कोई यूज़र नहीं मिला</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{user._id.slice(-6)}</td>
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        title="Edit"
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() =>
                          navigate(`/edit-admin/${user._id}`)
                        }
                      >
                        <FaEdit />
                      </button>
                      <button
                        title="Delete"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => onDeleteUser(user._id, user.name)}
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
      )}
    </div>
  );
};

export default AdminUserList;
