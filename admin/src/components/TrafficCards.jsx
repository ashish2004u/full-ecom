// src/components/TrafficChart.jsx
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, BarElement);

const TrafficChart = () => {
  const data = {
    labels: [
      "Jan 01", "Feb 01", "Mar 01", "Apr 01", "May 01",
      "Jun 01", "Jul 01", "Aug 01", "Sep 01", "Oct 01", "Nov 01", "Dec 01",
    ],
    datasets: [
      {
        label: "Total Sales",
        data: [15, 25, 35, 30, 50, 45, 55, 40, 60, 70, 65, 75],
        backgroundColor: "rgba(139, 92, 246, 0.5)",
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="bg-white p-6 shadow rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Monthly Sales Report</h3>
      <Bar data={data} options={options} height={100} />
    </div>
  );
};

export default TrafficChart;
