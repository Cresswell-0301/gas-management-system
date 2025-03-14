import ActionComponent from "./ActionComponent";

const CompanyList = ({ companies, handleEditCompany, handleDeleteCompany }) => {
    return (
        <table className="min-w-full table-auto">
            <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone Number</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Address</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">SSM Number</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
            </thead>
            <tbody>
                {companies.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="px-4 py-4 text-center text-gray-600">
                            Currently, there are no companies.{" "}
                        </td>
                    </tr>
                ) : (
                    companies.map((company) => (
                        <tr key={company._id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-700">{company.name}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{company.phoneNumber}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{company.address}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{company.ssmNumber}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">
                                <ActionComponent handleEdit={handleEditCompany} handleDelete={handleDeleteCompany} data={company} />
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default CompanyList;
