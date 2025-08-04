import React, { useState } from "react";
import DeliveredOrdersList from "../components/CompleteOrderList";

const CompletedOrder = () => {
  const [orders] = useState([
    { id: "ORD101", item: "Black T-Shirt", status: "Delivered" },
    { id: "ORD102", item: "Dragon Tee", status: "Cancelled" },
    { id: "ORD103", item: "Joggers", status: "Returned" },
    { id: "ORD104", item: "Cargo Pants", status: "Pending" }, // ignored
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">✅ Completed Orders</h1>
      < DeliveredOrdersList orders={orders} />
    </div>
  );
};

export default CompletedOrder;
