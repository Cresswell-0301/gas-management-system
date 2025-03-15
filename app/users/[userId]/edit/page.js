"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import UserForm from "@/components/UserForm";
import GetPathName from "@/controller/GetPathName";
import toast from "react-hot-toast";

const EditUserPage = () => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const res = await fetch(`/api/users/${GetPathName()}`);
            const data = await res.json();
            setUserData(data);
        };

        fetchUserData();
    }, [router.query]);

    const handleSubmit = async (userData) => {
        toast.dismiss();

        setIsSubmitting(true);

        const res = await fetch(`/api/users/${GetPathName()}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (res.ok) {
            toast.success("User data updated successfully!");
            router.push("/users");
        } else {
            toast.error("Failed to update user");
        }

        setIsSubmitting(false);
    };

    if (userData) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-600">Edit User</h1>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
                    <UserForm onSubmit={handleSubmit} isSubmitting={isSubmitting} initialData={userData} />
                </div>
            </div>
        );
    }
};

export default EditUserPage;
