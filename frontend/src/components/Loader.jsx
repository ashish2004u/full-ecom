// src/components/VideoLoader.jsx
import React from "react";

const VideoLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden">
      <video
        src="https://cdnl.iconscout.com/lottie/premium/thumb/outfit-planning-app-loader-8699441-7001067.mp4" // public folder ke andar video hona chahiye
        autoPlay
        muted
        loop
        className="w-50 h-50 object-cover"
      ></video>
    </div>
  );
};

export default VideoLoader;
