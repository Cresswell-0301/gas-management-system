"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CompanyList from "@/components/CompanyList";
import { Plus } from "lucide-react";

const CompaniesPage = () => {
    const router = useRouter();
    const [companies, setCompanies] = useState([]);

    const fetchCompanies = async () => {
        const res = await fetch("/api/companies");
        const data = await res.json();
        setCompanies(data);
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleEditCompany = async (company) => {
        router.push(`/companies/${company._id}/edit`);
    };

    const handleDeleteCompany = async (companyId) => {
        const confirmDelete = confirm("Are you sure you want to delete this Company?");

        if (!confirmDelete) return;

        const res = await fetch("/api/companies", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: companyId }),
        });

        if (!res.ok) {
            alert("Failed to delete company");
            return;
        } else {
            alert("Company has been deleted successfully!");
            fetchCompanies();
        }
    };

    return (
        <div className="h-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Company</h1>
                <Link href="/companies/add">
                    <span className="flex px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Plus className="mr-2" />
                        Add
                    </span>
                </Link>
            </div>
            <div className="bg-white shadow-md rounded-lg px-6 py-6 max-w-6xl mx-auto">
                <CompanyList companies={companies} handleEditCompany={handleEditCompany} handleDeleteCompany={handleDeleteCompany} />
            </div>
        </div>
    );
};

export default CompaniesPage;
