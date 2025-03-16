import ActionComponent from "./ActionComponent";

const UserList = ({ users, handleEditUser, handleDeleteUser }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Username</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="px-4 py-4 text-center text-gray-600">
                                Currently, you don&apos;t have any users yet.
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user._id} className=" hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-700">{user.username}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <ActionComponent handleEdit={handleEditUser} handleDelete={handleDeleteUser} data={user} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
