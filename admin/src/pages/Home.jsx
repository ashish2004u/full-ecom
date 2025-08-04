// src/pages/Home.jsx
import React from "react";
import DashboardCards from "../components/DashboardCards";
import TrafficChart from "../components/TrafficCards";

const Home = () => {
  return (
    <div className="space-y-6">
      <DashboardCards />
      <TrafficChart />
    </div>
  );
};

export default Home;
