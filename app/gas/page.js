"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GasList from "@/components/GasList";
import { Plus } from "lucide-react";

const GasPage = () => {
    const router = useRouter();
    const [gasTypes, setGasTypes] = useState([]);

    const fetchGasTypes = async () => {
        const res = await fetch("/api/gas");
        const data = await res.json();
        setGasTypes(data);
    };

    useEffect(() => {
        fetchGasTypes();
    }, []);

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

    return (
        <div className="h-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Gas</h1>
                <Link href="/gas/add">
                    <span className="flex px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Plus className="mr-2" />
                        Add
                    </span>
                </Link>
            </div>
            <div className="bg-white shadow-md rounded-lg px-6 py-6 max-w-6xl mx-auto">
                <GasList gasTypes={gasTypes} handleEditGas={handleEditGas} handleDeleteGas={handleDeleteGas} />
            </div>
        </div>
    );
};

export default GasPage;
