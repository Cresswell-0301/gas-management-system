"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CompanyList from "@/components/CompanyList";

const CompaniesPage = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            const res = await fetch("/api/companies");
            const data = await res.json();
            setCompanies(data);
        };

        fetchCompanies();
    }, []);

    return (
        <div className="h-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Company Lists</h1>
                <Link href="/companies/add">
                    <span className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Add</span>
                </Link>
            </div>
            <div className="bg-white shadow-md rounded-lg px-6 py-6 max-w-6xl mx-auto">
                <CompanyList companies={companies} />
            </div>
        </div>
    );
};

export default CompaniesPage;
