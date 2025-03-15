"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import OrderForm from "@/components/OrderForm";
import { CircleX, Undo2 } from "lucide-react";
import GetPathName from "@/controller/GetPathName";
import toast from "react-hot-toast";

const EditOrderPage = () => {
    const router = useRouter();
    const [orderData, setOrderData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [gasTypes, setGasTypes] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/orders/${GetPathName()}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch order");
                }
                const data = await res.json();
                setOrderData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
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

        fetchOrder();
        fetchCompanies();
        fetchGasTypes();
    }, [router.query]);

    const handleSubmit = async (updatedOrderData) => {
        toast.dismiss();

        setIsSubmitting(true);

        const res = await fetch(`/api/orders/${GetPathName()}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedOrderData),
        });

        if (res.ok) {
            toast.success("Order updated successfully!");
            router.push("/sales");
        } else {
            toast.error("Failed to update order");
        }
    };

    if (isLoading) {
        return <p>Loading order data...</p>;
    }

    return (
        <>
            {orderData ? (
                <OrderForm onSubmit={handleSubmit} companies={companies} gasTypes={gasTypes} isSubmitting={isSubmitting} initialData={orderData} />
            ) : (
                <div className="flex items-center justify-center h-full bg-gray-50 p-6">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="flex items-center justify-center text-2xl font-bold text-center text-red-600">
                            <CircleX className="mr-2" />
                            Order Not Found
                        </h2>
                        <p className="mt-4 text-center text-gray-600">
                            Sorry, we couldn't find the order you are looking for. It may have been removed or the link could be incorrect.
                        </p>
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={() => router.push("/sales")}
                                className="flex px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none"
                            >
                                <Undo2 className="mr-2" /> Go Back to Sales
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditOrderPage;
