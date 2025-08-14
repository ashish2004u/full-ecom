import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/slice/adminUserSlice";
import AdminUserList from "../../components/adminUser/ListAdmin";

const AdminUser = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.adminUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = (id, name) => {
    const confirmed = window.confirm(`क्या आप वाकई "${name}" को हटाना चाहते हैं?`);
    if (confirmed) {
      dispatch(deleteUser(id));
    }
  };

  const handleRefresh = () => {
    dispatch(fetchUsers());
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">👥 Admin & Users</h1>

      {loading && (
        <p className="text-center text-gray-500 my-6">लोड हो रहा है...</p>
      )}

      {error && (
        <p className="text-center text-red-600 my-6 font-semibold">{error}</p>
      )}

      {!loading && !error && (
        <AdminUserList
          users={users}
          onDeleteUser={handleDeleteUser}
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
};

export default AdminUser;
