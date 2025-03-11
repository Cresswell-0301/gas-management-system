import { useState } from "react";

const GasForm = ({ onSubmit, isSubmitting, initialData }) => {
    const [type, setType] = useState(initialData?.type || "");
    const [price, setPrice] = useState(initialData?.price || "");

    const handlePriceChange = (e) => {
        const value = e.target.value;
        // Allow only digits and one decimal point
        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setPrice(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const gasData = { type, price: parseFloat(price).toFixed(2) };
        onSubmit(gasData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700 text-sm font-medium">Gas Type:</label>
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isSubmitting} required />
            </div>

            <div>
                <label className="block text-gray-700 text-sm font-medium">Price:</label>
                <input type="text" value={price} onChange={handlePriceChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isSubmitting} required />
            </div>

            <div className="text-center">
                <button type="submit" className={`w-full py-2 px-4 ${isSubmitting ? "bg-gray-400" : "bg-blue-600"} text-white font-medium rounded-md shadow-sm hover:${isSubmitting ? "bg-gray-500" : "bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-blue-500`} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default GasForm;
