"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GasList from "@/components/GasList";

const GasPage = () => {
    const [gasTypes, setGasTypes] = useState([]);

    useEffect(() => {
        const fetchGasTypes = async () => {
            const res = await fetch("/api/gas");
            const data = await res.json();
            setGasTypes(data);
        };

        fetchGasTypes();
    }, []);

    return (
        <div className="h-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Gas Types</h1>
                <Link href="/admin/gas/add">
                    <span className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Add</span>
                </Link>
            </div>
            <div className="bg-white shadow-md rounded-lg px-6 py-6 max-w-6xl mx-auto">
                <GasList gasTypes={gasTypes} />
            </div>
        </div>
    );
};

export default GasPage;
