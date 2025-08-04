// src/components/DashboardCards.jsx
import React from "react";

const cards = [
  { label: "Customers", value: "1000" },
  { label: "Returns", value: "3550" },
  { label: "Revenue", value: "1252" },
  { label: "Growth", value: "600" },
  { label: "Downloads", value: "3550" },
  { label: "Orders", value: "100%" },
];

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white p-4 shadow rounded-xl text-center hover:shadow-md"
        >
          <h4 className="text-gray-500 text-sm">{card.label}</h4>
          <p className="text-2xl font-bold text-purple-600">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
