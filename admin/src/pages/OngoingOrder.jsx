import React, { useState } from "react";
import OngoingOrdersList from "../components/OngoingOrderList";

const OngoingOrder = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      status: "Pending",
      items: [
        {
          name: "Black Oversized T-Shirt",
          qty: 1,
          size: "L",
          image: "/images/black.jpg",
        },
      ],
    },
    {
      id: "ORD002",
      status: "Processing",
      items: [
        {
          name: "Dragon Graphic Tee",
          qty: 1,
          size: "M",
          image: "/images/dragon.jpg",
        },
      ],
    },
    {
      id: "ORD003",
      status: "Dispatched",
      items: [
        {
          name: "Cargo Pants",
          qty: 1,
          size: "XL",
          image: "/images/cargo.jpg",
        },
      ],
    },
    {
      id: "ORD004",
      status: "Delivered",
      items: [
        {
          name: "Printed Hoodie",
          qty: 1,
          size: "M",
          image: "/images/hoodie.jpg",
        },
      ],
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📦 Ongoing Orders</h1>
      <OngoingOrdersList orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default OngoingOrder;
