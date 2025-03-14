"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GasList from "@/components/GasList";
import Pagination from "@/components/Pagination";
import { Plus } from "lucide-react";
import CalculateCurrentData from "@/controller/CalculateCurrentData";

const GasPage = () => {
    const router = useRouter();
    const [gasTypes, setGasTypes] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(10);

    const fetchGasTypes = async () => {
        const res = await fetch("/api/gas");
        const data = await res.json();
        setGasTypes(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
    };

    useEffect(() => {
        fetchGasTypes();
    }, []);

    const filteredGasTypes = gasTypes
        .filter((gasType) => {
            const matchesSearch = gasType.type.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        })
        .sort((a, b) => a.type.localeCompare(b.type));

    const currentData = CalculateCurrentData(filteredGasTypes, currentPage, itemsPerPage);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredGasTypes.length / itemsPerPage));
        setCurrentPage(1);
    }, [searchQuery, gasTypes]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleEditGas = async (gas) => {
        router.push(`/gas/${gas._id}/edit`);
    };

    const handleDeleteGas = async (gasId) => {
        const confirmDelete = confirm("Are you sure you want to delete this Gas?");

        if (!confirmDelete) return;

        const res = await fetch("/api/gas", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: gasId }),
        });

        if (!res.ok) {
            alert("Failed to delete gas");
            return;
        } else {
            alert("Gas has been deleted successfully!");
            fetchGasTypes();
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="h-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Gas</h1>
                <Link href="/gas/add">
                    <span className="flex px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Plus className="mr-2" />
                        Add
                    </span>
                </Link>
            </div>

            <input
                type="text"
                placeholder="Search by Gas Name"
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-2 border border-gray-300 rounded-md w-full max-w-md"
            />

            <div className="bg-white shadow-md rounded-lg px-6 py-6 max-w-6xl mx-auto">
                <GasList gasTypes={currentData} handleEditGas={handleEditGas} handleDeleteGas={handleDeleteGas} />
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default GasPage;
