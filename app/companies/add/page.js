"use client";

import { useState } from "react";
import CompanyForm from "@/components/CompanyForm";
import toast from "react-hot-toast";

const AddCompanyPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (companyData) => {
        toast.dismiss();

        setIsSubmitting(true);

        const res = await fetch("/api/companies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(companyData),
        });

        if (res.ok) {
            toast.success("Company added successfully");
            window.location.href = "/companies";
        } else {
            toast.error("Failed to add company. Please try again.");
        }

        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Add New Company</h1>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
                <CompanyForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </div>
        </div>
    );
};

export default AddCompanyPage;
