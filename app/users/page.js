"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserList from "@/components/UserList";
import { Plus } from "lucide-react";

const UsersPage = () => {
    const router = useRouter();
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEditUser = (user) => {
        router.push(`/users/${user._id}/edit`);
    };

    const handleDeleteUser = async (userId) => {
        const confirmDelete = confirm("Are you sure you want to delete this user?");

        if (!confirmDelete) return;

        const res = await fetch("/api/users", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });

        if (res.ok) {
            alert("User has been deleted successfully!");
            fetchUsers();
        } else {
            alert("Failed to delete user");
        }
    };

    return (
        <div className="h-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Manage Users</h1>
                <Link href="/users/add">
                    <span className="flex px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Plus className="mr-2" />
                        Add
                    </span>
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
                <UserList users={users} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} />
            </div>
        </div>
    );
};

export default UsersPage;
