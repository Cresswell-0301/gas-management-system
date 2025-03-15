"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserList from "../../../components/UserList";
import { Plus } from "lucide-react";
import CalculateCurrentData from "@/controller/CalculateCurrentData";
import Pagination from "../../../components/Pagination";
import toast from "react-hot-toast";

const UsersPage = () => {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(10);

    const fetchUsers = async () => {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const currentData = CalculateCurrentData(users, currentPage, itemsPerPage);

    useEffect(() => {
        setTotalPages(Math.ceil(users.length / itemsPerPage));
    }, [users]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = currentData
        .filter((user) => {
            const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        })
        .sort((a, b) => a.username.localeCompare(b.username));

    const handleEditUser = (user) => {
        router.push(`/users/${user._id}/edit`);
    };

    const handleDeleteUser = async (userId) => {
        toast.dismiss();

        const confirmDelete = confirm("Are you sure you want to delete this user?");

        if (!confirmDelete) return;

        const res = await fetch("/api/users", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });

        if (res.ok) {
            toast.success("User has been deleted successfully!");
            fetchUsers();
        } else {
            toast.error("Failed to delete user");
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="h-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Manage Users</h1>
                <Link href="/users/add">
                    <span className="flex px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Plus className="mr-2" />
                        Add
                    </span>
                </Link>
            </div>

            <input
                type="text"
                placeholder="Search by User Name"
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-2 border border-gray-300 rounded-md w-full max-w-md"
            />

            <div className="bg-white shadow-md rounded-lg px-6 py-6 max-w-6xl mx-auto">
                <UserList users={filteredUsers} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} />
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default UsersPage;
