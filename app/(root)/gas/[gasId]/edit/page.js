"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import GasForm from "../../../../../components/GasForm";
import GetPathName from "../../../../../controller/GetPathName";
import toast from "react-hot-toast";

const EditGasPage = () => {
    const router = useRouter();

    const [gasData, setGasData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchGasData = async () => {
            const res = await fetch(`/api/gas/${GetPathName()}`);
            const data = await res.json();
            setGasData(data);
        };
        fetchGasData();
    }, [router.query]);

    const handleSubmit = async (gasData) => {
        toast.dismiss();

        setIsSubmitting(true);

        const res = await fetch(`/api/gas/${GetPathName()}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gasData),
        });

        if (res.ok) {
            toast.success("Gas data updated successfully!");
            router.push("/gas");
        } else {
            toast.error("Failed to update gas");
        }

        setIsSubmitting(false);
    };

    if (gasData) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-600">Edit Gas Type</h1>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
                    <GasForm onSubmit={handleSubmit} isSubmitting={isSubmitting} initialData={gasData} />
                </div>
            </div>
        );
    }
};

export default EditGasPage;
