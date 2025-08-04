    import React, { useState } from "react";

    const statusOptions = [
    "Pending",
    "Processing",
    "Dispatched",
    "Delivered", // Keep Delivered but confirm on change
    ];

    const completedStatus = ["Delivered", "Cancelled", "Returned"];

    const OngoingOrdersList = ({ orders = [], onStatusChange }) => {
    const [openRow, setOpenRow] = useState(null);

    const toggleRow = (orderId) => {
        setOpenRow(openRow === orderId ? null : orderId);
    };

    const handleStatusChange = (orderId, newStatus, prevStatus) => {
        if (newStatus === "Delivered") {
        const confirmed = window.confirm("Are you sure you want to mark this order as Delivered?");
        if (!confirmed) return; // Don't proceed if cancelled
        }
        if (onStatusChange) onStatusChange(orderId, newStatus);
    };

    const ongoingOrders = orders.filter(
        (order) => !completedStatus.includes(order.status)
    );

    return (
        <div className="p-6">
        <h2 className="text-xl font-bold mb-4">📦 Ongoing Orders</h2>
        <table className="w-full text-left border border-gray-300">
            <thead className="bg-gray-100">
            <tr>
                <th className="p-2 border-b">Order ID</th>
                <th className="p-2 border-b">Total Items</th>
                <th className="p-2 border-b">Status</th>
            </tr>
            </thead>
            <tbody>
            {ongoingOrders.length === 0 ? (
                <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                    No ongoing orders.
                </td>
                </tr>
            ) : (
                ongoingOrders.map((order) => (
                <React.Fragment key={order.id}>
                    <tr
                    className="border-b cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleRow(order.id)}
                    >
                    <td className="p-2 font-semibold">{order.id}</td>
                    <td className="p-2">{order.items?.length || 0}</td>
                    <td className="p-2">
                        <select
                        value={order.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                            handleStatusChange(order.id, e.target.value, order.status)
                        }
                        className="border px-2 py-1 rounded"
                        >
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>
                            {status}
                            </option>
                        ))}
                        </select>
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
                                <span>
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
                ))
            )}
            </tbody>
        </table>
        </div>
    );
    };

    export default OngoingOrdersList;
