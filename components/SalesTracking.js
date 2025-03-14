"use client";

import ActionComponent from "./ActionComponent";

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
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Price (RM)</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Quantity</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Total (RM)</th>
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
                                <td className="px-4 py-2 text-sm text-gray-800 text-right">{order.gasType.price.$numberDecimal}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 text-right">{order.quantity}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 text-right">{parseFloat(order.totalPrice.$numberDecimal).toFixed(2)}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <ActionComponent handleEdit={handleEditOrder} handleDelete={handleDeleteOrder} data={order} />
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
