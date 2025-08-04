import React from "react";
import ReturnOrdersList from "../components/ReturnOrderList";

const ReturnOrdersPage = () => {
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
    status: "Returned",
    items: [
      {
        name: "Green T-Shirt",
        qty: 1,
        image: "/images/green-shirt.jpg",
      },
    ],
  },
];


  return <ReturnOrdersList   orders={orders} />;
};

export default ReturnOrdersPage;
