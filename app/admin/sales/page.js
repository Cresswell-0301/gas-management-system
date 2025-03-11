"use client";

import { useState, useEffect } from "react";
import SalesTracking from "@/components/SalesTracking";
import OrderForm from "@/components/OrderForm";

const SalesPage = () => {
    const [orders, setOrders] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [gasTypes, setGasTypes] = useState([]);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch("/api/orders");
            const data = await res.json();
            setOrders(data);
        };

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

        fetchOrders();
        fetchCompanies();
        fetchGasTypes();
    }, []);

    // Function to export the data to CSV
    const exportToCSV = () => {
        const csvHeader = ["Company Name", "Gas Type", "Price per Gas", "Quantity", "Total Price"];

        const csvRows = orders.map((order) => [order.companyId.name, order.gasType.type, "RM " + order.gasType.price.$numberDecimal, order.quantity, "RM " + order.totalPrice.$numberDecimal]);

        const csvContent = [csvHeader.join(","), ...csvRows.map((row) => row.join(","))].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);

        link.download = "sales_data.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    };

    const handleSubmit = async (orderData) => {
        setIsSubmitting(true);

        const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        if (res.ok) {
            alert("Order added successfully");
            window.location.href = "/admin/sales";
        } else {
            alert("Failed to add order. Please try again.");
        }

        setIsSubmitting(false);
    };

    return (
        <div className="h-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Sales Tracking</h1>
                <div className="space-x-4">
                    <button onClick={exportToCSV} className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700">
                        Export
                    </button>

                    <button onClick={() => setShowOrderForm((prev) => !prev)} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700">
                        {showOrderForm ? "Close Order Form" : "+ Order"}
                    </button>
                </div>
            </div>

            {showOrderForm && (
                <div className="bg-white shadow-md rounded-lg px-6 py-6 pb-0 max-w-6xl mx-auto mb-8">
                    <OrderForm onSubmit={handleSubmit} companies={companies} gasTypes={gasTypes} isSubmitting={isSubmitting} />
                </div>
            )}

            <div className="bg-white shadow-md rounded-lg px-6 py-6 max-w-6xl mx-auto">
                <SalesTracking orders={orders} />
            </div>
        </div>
    );
};

export default SalesPage;
