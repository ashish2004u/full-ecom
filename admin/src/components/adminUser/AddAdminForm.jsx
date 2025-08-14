import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addUser } from "../../redux/slice/adminUserSlice";

const AddAdminForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.adminUsers?.loading) ?? false;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("कृपया सभी फ़ील्ड भरें");
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage: ", token); // Token check

      if (!token) {
        toast.error("Please login first!");
        return;
      }

      const resultAction = await dispatch(addUser(formData));

      if (addUser.fulfilled.match(resultAction)) {
        toast.success("यूज़र सफलतापूर्वक जोड़ा गया!");
        setFormData({ name: "", email: "", password: "", role: "user" });
      } else {
        toast.error(resultAction.payload || "यूज़र जोड़ने में त्रुटि हुई!");
      }
    } catch (error) {
      toast.error("यूज़र जोड़ने में त्रुटि हुई!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">➕ Add Admin/User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter password"
          />
        </div>

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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default AddAdminForm;
