import React from 'react';
import AddAdminForm from '../../components/adminUser/AddAdminForm';

const AddAdmin = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel - Add New User</h1>
      <AddAdminForm />
    </div>
  );
};

export default AddAdmin;
