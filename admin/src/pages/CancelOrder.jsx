import React from "react";
import CancelOrdersList from "../components/CancelOrderList";

const CancelOrdersPage = () => {
    const orders = [
  {
    id: "ORD1009",
    status: "Cancelled",
    items: [
      {
        name: "White Oversized T-Shirt",
        qty: 1,
        image: "/images/white-oversized.jpg",
      },
      {
        name: "Black Hoodie",
        qty: 2,
        image: "/images/black-hoodie.jpg",
      },
    ],
  },
  {
    id: "ORD1010",
    status: "Delivered",
    items: [
      {
        name: "Green T-Shirt",
        qty: 1,
        image: "/images/green-shirt.jpg",
      },
    ],
  },
];


  return (
    <div className="min-h-screen bg-white">
      <CancelOrdersList orders={orders} />
    </div>
  );
};

export default CancelOrdersPage;
