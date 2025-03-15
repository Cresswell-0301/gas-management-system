"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CompanyList from "../../../components/CompanyList";
import { Plus } from "lucide-react";
import CalculateCurrentData from "../../../controller/CalculateCurrentData";
import Pagination from "../../../components/Pagination";
import toast from "react-hot-toast";

const CompaniesPage = () => {
    const router = useRouter();
    const [companies, setCompanies] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(9);

    const fetchCompanies = async () => {
        const res = await fetch("/api/companies");
        const data = await res.json();
        setCompanies(data);
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const filteredCompanies = companies
        .filter((company) => {
            const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    const currentData = CalculateCurrentData(filteredCompanies, currentPage, itemsPerPage);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredCompanies.length / itemsPerPage));
        setCurrentPage(1);
    }, [searchQuery, companies]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleEditCompany = async (company) => {
        router.push(`/companies/${company._id}/edit`);
    };

    const handleDeleteCompany = async (companyId) => {
        toast.dismiss();

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
            toast.error("Failed to delete company");
            return;
        } else {
            toast.success("Company has been deleted successfully!");
            fetchCompanies();
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="h-full bg-white py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Company</h1>
                <Link href="/companies/add">
                    <span className="flex px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Plus className="mr-2" />
                        Add
                    </span>
                </Link>
            </div>

            <input
                type="text"
                placeholder="Search by Company Name"
                value={searchQuery}
                onChange={handleSearchChange}
                className="mb-4 p-2 border border-gray-300 rounded-md w-full max-w-md"
            />

            <div className="bg-white shadow-md rounded-lg px-6 py-6 max-w-6xl mx-auto">
                <CompanyList companies={currentData} handleEditCompany={handleEditCompany} handleDeleteCompany={handleDeleteCompany} />
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default CompaniesPage;
