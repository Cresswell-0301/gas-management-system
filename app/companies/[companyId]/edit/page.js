"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CompanyForm from "@/components/CompanyForm";
import GetPathName from "@/controller/GetPathName";

const EditCompanyPage = () => {
    const router = useRouter();
    const [company, setCompany] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCompany = async () => {
            const res = await fetch(`/api/companies/${GetPathName()}`);
            if (!res.ok) {
                throw new Error("Failed to fetch company");
            }
            const data = await res.json();
            setCompany(data);
        };
        fetchCompany();
    }, [router.query]);

    const handleSubmit = async (updatedCompanyData) => {
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/companies/${GetPathName()}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCompanyData),
            });

            if (res.ok) {
                alert("Company updated successfully!");
                router.push("/companies");
            } else {
                alert("Failed to update company");
            }
        } catch (error) {
            alert("An error occurred while updating the company.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!company) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Edit Company</h1>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
                <CompanyForm initialData={company} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </div>
        </div>
    );
};

export default EditCompanyPage;
