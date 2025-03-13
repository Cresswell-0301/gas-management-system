"use client";

import { useState, useEffect } from "react";
import UserForm from "@/components/UserForm";

const UserAddPage = () => {
    const [editingUser, setEditingUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetching a user to edit (can be done based on route params or some ID)
        const fetchUserToEdit = async () => {
            // Replace this with your logic for fetching a user
            // Example: Fetch user by ID from the URL
            const userId = "some_user_id"; // Get this dynamically from URL or context
            const res = await fetch(`/api/users/${userId}`);
            const data = await res.json();
            setEditingUser(data); // Set the user data if editing
            setIsLoading(false); // Stop loading
        };

        if (editingUser === null) {
            setIsLoading(false);
        }

        fetchUserToEdit();
    }, [editingUser]);

    const handleCreateUser = async (userData) => {
        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (res.ok) {
            alert(await res.text());
            window.location.href = "/users";
        } else {
            alert(await res.text());
        }
    };

    const handleUpdateUser = async (userData) => {
        const res = await fetch("/api/users", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: editingUser._id, updateData: userData }),
        });

        if (res.ok) {
            const updatedUser = await res.json();
            setEditingUser(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-600">{editingUser ? "Edit User" : "Create New User"}</h1>
            </div>

            {/* User Form Section */}
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto mb-8">
                {isLoading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : (
                    <UserForm onSubmit={editingUser ? handleUpdateUser : handleCreateUser} initialData={editingUser || {}} />
                )}
            </div>
        </div>
    );
};

export default UserAddPage;
