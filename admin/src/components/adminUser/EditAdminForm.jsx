import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchUserById, updateUser } from "../../redux/slice/adminUserSlice";

const EditAdminForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedUser, loading } = useSelector((state) => state.adminUsers);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });

  // Page load par user fetch karo (Redux se)
  useEffect(() => {
    if (id) dispatch(fetchUserById(id));
  }, [dispatch, id]);

  // Jab Redux me data aa jaye to form fill karo
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        role: selectedUser.role || "user",
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      return toast.error("सभी फ़ील्ड भरें");
    }

    try {
      await dispatch(updateUser({ id, userData: formData })).unwrap();
      toast.success("यूज़र सफलतापूर्वक अपडेट हुआ");
      navigate("/admin-user");
    } catch (err) {
      toast.error(err || "यूज़र अपडेट करने में समस्या हुई");
    }
  };

  if (loading && !selectedUser) {
    return <p className="text-center py-6">⏳ Loading user data...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">✏️ Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter email address"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block font-medium mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update User"}
        </button>
      </form>
    </div>
  );
};

export default EditAdminForm;
