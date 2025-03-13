"use client";

import { SquarePen, Trash2 } from "lucide-react";

const SalesTracking = ({ orders, handleEditOrder, handleDeleteOrder }) => {
    return (
        <div>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Invoice</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Date</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Company</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Gas</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Price</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Quantity</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Total</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="px-4 py-4 text-center text-gray-600">
                                Currently, you don't have any orders yet.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-800">{order.invoiceNumber}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">
                                    {new Date(new Date(order.created_at).getTime() - 8 * 60 * 60 * 1000).toLocaleString("en-MY", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800">{order.companyId?.name}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">{order.gasType?.type}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">RM {order.gasType.price.$numberDecimal}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">{order.quantity}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">RM {parseFloat(order.totalPrice.$numberDecimal).toFixed(2)}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <div className="space-x-2 space-y-2">
                                        {/* Edit */}
                                        <button onClick={() => handleEditOrder(order)} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600" title="Edit">
                                            <SquarePen width={18} />
                                        </button>

                                        {/* Delete */}
                                        <button onClick={() => handleDeleteOrder(order._id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700" title="Delete">
                                            <Trash2 width={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTracking;
