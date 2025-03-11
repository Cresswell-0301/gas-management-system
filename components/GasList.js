const GasList = ({ gasTypes }) => {
    return (
        <table className="min-w-full table-auto">
            <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Type</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
                </tr>
            </thead>
            <tbody>
                {gasTypes.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="px-4 py-4 text-center text-gray-600">
                            Currently, there are no gas types available.
                        </td>
                    </tr>
                ) : (
                    gasTypes.map((gas) => (
                        <tr key={gas._id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-700">{gas.type}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">RM {gas.price.$numberDecimal}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default GasList;
