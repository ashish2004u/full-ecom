import React, { useState } from "react";

const CancelOrdersList = ({ orders = [] }) => {
  const [openRow, setOpenRow] = useState(null);

  const toggleRow = (orderId) => {
    setOpenRow(openRow === orderId ? null : orderId);
  };

  // Filter only cancelled orders
  const cancelledOrders = orders.filter((order) => order.status === "Cancelled");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-red-600">❌ Cancelled Orders</h2>

      {cancelledOrders.length === 0 ? (
        <p className="text-gray-500 text-center">No cancelled orders yet.</p>
      ) : (
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">Order ID</th>
              <th className="p-3 border-b">Total Items</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {cancelledOrders.map((order) => (
              <React.Fragment key={order.id}>
                <tr
                  className="border-b cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleRow(order.id)}
                >
                  <td className="p-3 font-semibold text-sm">{order.id}</td>
                  <td className="p-3 text-sm">{order.items?.length || 0}</td>
                  <td className="p-3 font-medium text-red-600 text-sm">
                    {order.status}
                  </td>
                </tr>

                {openRow === order.id && (
                  <tr>
                    <td colSpan="3" className="p-4 bg-gray-50">
                      <div className="pl-4">
                        <h4 className="font-medium mb-2">🛍 Products:</h4>
                        <ul className="space-y-2">
                          {(order.items || []).map((item, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-4 border-b pb-2"
                            >
                              <img
                                src={item.image || "/images/placeholder.jpg"}
                                onError={(e) =>
                                  (e.target.src = "/images/placeholder.jpg")
                                }
                                alt={item.name}
                                className="w-14 h-14 object-cover rounded border"
                              />
                              <span className="text-sm">
                                {item.name} – Qty: {item.qty} – Size: {item.size}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CancelOrdersList;
