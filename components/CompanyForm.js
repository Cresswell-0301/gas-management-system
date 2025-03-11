import { useState } from "react";

const CompanyForm = ({ onSubmit, isSubmitting, initialData }) => {
    const [name, setName] = useState(initialData?.name || "");
    const [address, setAddress] = useState(initialData?.address || "");
    const [ssmNumber, setSsmNumber] = useState(initialData?.ssmNumber || "");
    const [phoneNumber, setPhoneNumber] = useState(initialData?.phoneNumber || "");

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;

        if (/^[0-9+\-]*$/.test(value)) {
            setPhoneNumber(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const companyData = { name, address, ssmNumber, phoneNumber };
        onSubmit(companyData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-full max-w-lg mx-auto">
            <div>
                <label className="block text-gray-700 text-sm font-medium">Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isSubmitting} required />
            </div>

            <div>
                <label className="block text-gray-700 text-sm font-medium">SSM Number:</label>
                <input type="text" value={ssmNumber} onChange={(e) => setSsmNumber(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isSubmitting} required />
            </div>

            <div>
                <label className="block text-gray-700 text-sm font-medium">Phone Number:</label>
                <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isSubmitting} required />
            </div>

            <div>
                <label className="block text-gray-700 text-sm font-medium">Address:</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isSubmitting} required rows="4" placeholder="Enter the company address" />
            </div>

            <div className="text-center">
                <button type="submit" className={`w-full py-2 px-4 ${isSubmitting ? "bg-gray-400" : "bg-blue-600"} text-white font-medium rounded-md shadow-sm hover:${isSubmitting ? "bg-gray-500" : "bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-blue-500`} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default CompanyForm;
