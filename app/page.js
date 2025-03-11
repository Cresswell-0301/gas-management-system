"use client";

import { useState, useEffect } from "react";
import OrderForm from "@/components/OrderForm";

export default function Home() {
    const [companies, setCompanies] = useState([]);
    const [gasTypes, setGasTypes] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCompanies = async () => {
            const res = await fetch("/api/companies");
            const data = await res.json();
            setCompanies(data);
        };

        const fetchGasTypes = async () => {
            const res = await fetch("/api/gas");
            const data = await res.json();
            setGasTypes(data);
        };

        fetchCompanies();
        fetchGasTypes();
    }, []);

    const handleSubmit = async (orderData) => {
        setIsSubmitting(true);

        const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        if (res.ok) {
            alert("Order added successfully");
            window.location.href = "/";
        } else {
            alert("Failed to add order. Please try again.");
        }

        setIsSubmitting(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 ">
            <div className="bg-white shadow-md rounded-lg px-6 py-6 max-w-6xl mx-auto my-auto w-full">
                <OrderForm onSubmit={handleSubmit} companies={companies} gasTypes={gasTypes} isSubmitting={isSubmitting} />
            </div>
        </div>
    );
}
