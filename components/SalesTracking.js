const SalesTracking = ({ orders }) => {
    return (
        <div>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-100">Company</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-100">Gas Type</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-100">Price per Gas</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-100">Quantity</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-100">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="px-4 py-4 text-center text-gray-600">
                                Currently, you don't have any orders yet.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-800">{order.companyId?.name}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">{order.gasType?.type}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">RM {order.gasType.price.$numberDecimal}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">{order.quantity}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">RM {order.totalPrice.$numberDecimal}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTracking;
