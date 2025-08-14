import React from 'react';
import EditAdminForm from '../../components/adminUser/EditAdminForm';

const EditAdmin = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Edit User</h1>
      <EditAdminForm />
    </div>
  );
};

export default EditAdmin;
