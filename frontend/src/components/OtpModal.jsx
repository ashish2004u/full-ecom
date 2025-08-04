import React from "react";
import toast from "react-hot-toast";

const OTPModal = ({ otp, setOtp, onClose, onVerify, onResend }) => {
  // Wrap onVerify to show toast before calling parent's onVerify
  const handleVerifyClick = () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    // you can also show a loading toast here if needed
    onVerify();
  };

  // Wrap onResend to show toast before calling parent's onResend
  const handleResendClick = () => {
    toast.loading("Resending OTP...");
    onResend();
    // The parent will show success/error toast after API call
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Enter OTP</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <div className="flex justify-between mb-2">
          <button
            onClick={handleVerifyClick}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Verify
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
        <button
          onClick={handleResendClick}
          className="text-blue-600 text-sm underline w-full mt-2 text-center"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OTPModal;
