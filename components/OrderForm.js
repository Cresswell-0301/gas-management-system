import { useState, useEffect } from "react";

const OrderForm = ({ onSubmit, companies = [], gasTypes = [], initialData }) => {
    const [companyId, setCompanyId] = useState(initialData?.companyId || "");
    const [gasType, setGasType] = useState(initialData?.gasType || "");
    const [quantity, setQuantity] = useState(initialData?.quantity || "");
    const [pricePerGas, setPricePerGas] = useState(initialData?.pricePerGas || 0);
    const [totalPrice, setTotalPrice] = useState(initialData?.totalPrice || 0);

    useEffect(() => {
        if (gasType && gasTypes.length > 0) {
            const selectedGas = gasTypes.find((gas) => gas._id === gasType);
            const price = selectedGas?.price.$numberDecimal || 0;
            setPricePerGas(price);

            if (quantity) {
                setTotalPrice((price * quantity).toFixed(2) || 0);
            }
        }
    }, [gasType, quantity, gasTypes]);

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (/^[0-9]*$/.test(value)) {
            setQuantity(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderData = { companyId, gasType, pricePerGas, quantity, totalPrice };
        onSubmit(orderData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
            {/* Company Selector */}
            <div>
                <label className="block text-gray-700 text-sm font-medium">Company</label>
                <select
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="" disabled>
                        Select Company
                    </option>
                    {companies &&
                        companies.length > 0 &&
                        companies.map((company) => (
                            <option key={company._id} value={company._id}>
                                {company.name}
                            </option>
                        ))}
                </select>
            </div>

            {/* Gas Type Selector */}
            <div>
                <label className="block text-gray-700 text-sm font-medium">Gas Type</label>
                <select
                    value={gasType}
                    onChange={(e) => setGasType(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="" disabled>
                        Select Gas Type
                    </option>
                    {gasTypes &&
                        gasTypes.length > 0 &&
                        gasTypes.map((gas) => (
                            <option key={gas._id} value={gas._id}>
                                {gas.type} &nbsp; - RM {gas.price.$numberDecimal}
                            </option>
                        ))}
                </select>
            </div>

            {/* Quantity Input */}
            <div>
                <label className="block text-gray-700 text-sm font-medium">Quantity</label>
                <input
                    type="text"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            {/* Price per Gas */}
            <div>
                <label className="block text-gray-700 text-sm font-medium">Price per Gas (RM)</label>
                <input
                    type="text"
                    value={`RM ${pricePerGas === 0 ? pricePerGas.toFixed(2) : pricePerGas}`}
                    disabled
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm bg-gray-100"
                />
            </div>

            {/* Total Price */}
            <div>
                <label className="block text-gray-700 text-sm font-medium">Total Price (RM)</label>
                <input
                    type="text"
                    value={`RM ${totalPrice === 0 ? totalPrice.toFixed(2) : totalPrice}`}
                    disabled
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm bg-gray-100"
                />
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit Order
                </button>
            </div>
        </form>
    );
};

export default OrderForm;
