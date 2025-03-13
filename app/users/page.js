"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch("/api/users");
            const data = await res.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    const handleEditUser = (user) => {
        setEditingUser(user);
        setIsCreating(false);
    };

    const handleDeleteUser = async (userId) => {
        const res = await fetch("/api/users", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });

        if (res.ok) {
            setUsers(users.filter((user) => user._id !== userId));
        }
    };

    return (
        <div className="h-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Manage Users</h1>
                <Link href="/users/add">
                    <span className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Add
                    </span>
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
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
                                    Currently, you don't have any users yet.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2 text-sm text-gray-700">{user.username}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        <div className="space-x-2">
                                            <button onClick={() => handleEditUser(user)} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDeleteUser(user._id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersPage;
