import React from "react";

const ResetPasswordModal = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  onSubmit,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-sm shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-center">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ring-blue-400 mb-4"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ring-blue-400 mb-4"
        />
        <div className="flex justify-between">
          <button
            onClick={onSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
