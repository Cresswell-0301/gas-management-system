"use client";

import { useState, useEffect } from "react";
import OrderForm from "../../components/OrderForm";
import toast from "react-hot-toast";

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
        toast.dismiss();

        setIsSubmitting(true);

        const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        if (!res.ok) {
            toast.error("Failed to add order. Please try again.");
        }

        toast.success("Order added successfully");

        setIsSubmitting(false);

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center h-full bg-white">
            <div className="bg-white shadow-md rounded-lg px-6 py-6 max-w-6xl mx-auto my-auto w-full">
                <OrderForm onSubmit={handleSubmit} companies={companies} gasTypes={gasTypes} isSubmitting={isSubmitting} initialData={[]} />
            </div>
        </div>
    );
}
