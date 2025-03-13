"use client";

import { useState } from "react";
import GasForm from "@/components/GasForm"; // Make sure this path is correct

const AddGasPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (gasData) => {
        setIsSubmitting(true);

        const res = await fetch("/api/gas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(gasData),
        });

        if (res.ok) {
            alert("Gas type added successfully");
            window.location.href = "/gas";
        } else {
            alert("Failed to add gas type. Please try again.");
        }

        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Add New Gas Type</h1>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
                <GasForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </div>
        </div>
    );
};

export default AddGasPage;
