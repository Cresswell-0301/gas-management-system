"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SalesTracking from "@/components/SalesTracking";
import { ArrowDownToLine, FileDown } from "lucide-react";
import CalculateCurrentData from "@/controller/CalculateCurrentData";
import Pagination from "@/components/Pagination";

function getFileName(selectedCompany, selectedMonth, filteredOrders, type) {
    let fileName = `Sales_Data.` + type;

    if (selectedMonth && selectedMonth !== "") {
        fileName = `${selectedMonth.replace(/\s+/g, "_")}_` + fileName;
    }

    if (selectedCompany && selectedCompany !== "") {
        const company = filteredOrders.find((order) => order.companyId._id === selectedCompany);

        if (company && company.companyId && company.companyId.name) {
            fileName = `${company.companyId.name.replace(/\s+/g, "_")}_` + fileName;
        }
    }

    return fileName;
}

function filterData(orders, selectedCompany, selectedMonth, searchQuery) {
    return orders
        .filter((order) => {
            const matchesCompany = selectedCompany ? order.companyId._id === selectedCompany : true;
            const matchesSearch = order.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesMonth = selectedMonth ? new Date(order.created_at).toLocaleString("en-MY", { month: "short", year: "numeric" }) === selectedMonth : true;
            return matchesCompany && matchesSearch && matchesMonth;
        })
        .sort((a, b) => b.invoiceNumber.localeCompare(a.invoiceNumber));
}

const SalesPage = () => {
    const router = useRouter();
    const [orders, setOrders] = useState([]);

    // Filter
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(10);

    const fetchOrders = async () => {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredCurrentOrders = filterData(orders, selectedCompany, selectedMonth, searchQuery);

    const currentData = CalculateCurrentData(filteredCurrentOrders, currentPage, itemsPerPage, "sales");

    useEffect(() => {
        setTotalPages(Math.ceil(filteredCurrentOrders.length / itemsPerPage));
        setCurrentPage(1);
    }, [searchQuery, selectedCompany, selectedMonth, orders]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCompanyChange = (e) => {
        setSelectedCompany(e.target.value);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const uniqueCompanies = Array.from(new Set(orders.map((order) => order.companyId._id))).map((id) => orders.find((order) => order.companyId._id === id).companyId);

    const uniqueMonths = Array.from(new Set(orders.map((order) => new Date(order.created_at).toLocaleString("en-MY", { month: "short", year: "numeric" }))));

    const filteredOrders = filterData(orders, selectedCompany, selectedMonth, searchQuery);

    // Function to export the data to CSV
    const exportToCSV = () => {
        const csvHeader = ["Date", "Invoice No", "Company Name", "Gas Type", "Price per Gas", "Quantity", "Total Price"];

        const csvRows = filteredOrders.map((order) => [
            new Date(new Date(order.created_at).getTime() - 8 * 60 * 60 * 1000).toLocaleString("en-MY", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
            order.invoiceNumber,
            order.companyId.name,
            order.gasType.type,
            "RM " + order.gasType.price.$numberDecimal,
            order.quantity,
            "RM " + order.totalPrice.$numberDecimal,
        ]);

        const csvContent = [csvHeader.join(","), ...csvRows.map((row) => row.join(","))].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);

        link.download = getFileName(selectedCompany, selectedMonth, filteredOrders, "csv");

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    };

    // Function to export the data to PDF
    const exportToPDF = async () => {
        if (selectedCompany === "" && selectedMonth === "") {
            alert("Please select a company & month to export PDF");
            return;
        }

        if (selectedCompany === "") {
            alert("Please select a company to export PDF");
            return;
        }

        if (selectedMonth === "") {
            alert("Please select a month to export PDF");
            return;
        }

        const htmlContent = `
                <head>
                    <style>
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                            background-color: white;
                        }

                        body {
                            font-family: Arial, sans-serif;
                        }

                        .invoice-container {
                            width: 100%;
                            max-width: 800px;
                            margin: 20px auto;
                            background-color: white;
                            padding: 40px;
                        }

                        .header {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 30px;
                        }

                        .logo img {
                            width: 100px;
                            height: auto;
                        }

                        .header-info h1 {
                            font-size: 36px;
                            color: #2d2d2d;
                        }

                        .header-info p {
                            font-size: 14px;
                            color: #2d2d2d;
                        }

                        .client-info {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 20px;
                        }

                        .client-address,
                        .invoice-details {
                            width: 45%;
                        }

                        .client-address h2,
                        .invoice-details h2 {
                            font-size: 18px;
                            font-weight: bold;
                            margin-bottom: 10px;
                        }

                        .invoice-table {
                            width: 100%;
                            margin-bottom: 30px;
                            border-collapse: collapse;
                        }

                        .invoice-table th,
                        .invoice-table td {
                            padding: 10px;
                            text-align: left;
                        }

                        .invoice-table th {
                            background-color: #f9f9f9;
                            font-weight: bold;
                        }

                        .total-due {
                            text-align: right;
                            font-size: 18px;
                            margin-bottom: 30px;
                        }

                        .invoice-table th:nth-child(n+4),
                        .invoice-table td:nth-child(n+4) {
                            text-align: right;
                        }
                    </style>
                </head>
                <body>
            <div class="invoice-container">
                <div class="header">
                    <div class="logo">
                        <!-- <img src="logo.png" alt="Company Logo"> -->
                    </div>
                    <div class="header-info" style="text-align: right;">
                        <h1 style="margin: 10px 0px;">INVOICE</h1>
                        <h4>Win Hang Enterprise</h4>
                        <p style="padding-top: 8px;">No 52 Jln PUJ 5/7<br>Tmn Puncak Jalil<br>43300 Seri Kembangan<br> Selengor</p>
                        <p style="padding-top: 8px;">+6017-626 6883</p>
                    </div>
                </div>

                <div class="client-info">
                    <div class="client-address">
                        <h2>${filteredOrders.length > 0 && filteredOrders[0].companyId.name}</h2>
                        <p style="padding-top: 8px;">(${filteredOrders.length > 0 && filteredOrders[0].companyId.ssmNumber})</p>
                        <p style="padding-top: 8px;">${filteredOrders.length > 0 && filteredOrders[0].companyId.address}</p>
                        <p style="padding-top: 8px;">${filteredOrders.length > 0 && filteredOrders[0].companyId.phoneNumber}</p>
                    </div>
                    <div class="invoice-details" style="display: flex; justify-content: flex-end;">
                        <table style="width: auto; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: left; padding: 2px; vertical-align: bottom; padding-right: 10px;">Invoice Date:</td>
                                <td style="text-align: right; padding: 2px; vertical-align: bottom;">
                                    <strong>${new Date().toLocaleDateString("en-MY", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}</strong>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <table class="invoice-table">
                    <thead>
                        <tr>
                            <th>Invoice No</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Unit Price (RM)</th>
                            <th>Amount (RM)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredOrders
                            .map(
                                (order) => `
                            <tr>
                                <td>${order.invoiceNumber}</td>
                                <td>${new Date(new Date(order.created_at).getTime() - 8 * 60 * 60 * 1000).toLocaleString("en-MY", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}</td>
                                <td>${order.gasType.type}</td>
                                <td>${order.quantity}</td>
                                <td>${order.gasType.price.$numberDecimal}</td>
                                <td>${order.totalPrice.$numberDecimal}</td>
                            </tr>`
                            )
                            .join("")}
                    </tbody>
                </table>

                <div style="border-bottom: 1px solid #000; margin-bottom: 20px;"></div>

                <div class="total-due">
                    <p>Total Due: <strong>RM ${filteredOrders.reduce((total, order) => total + parseFloat(order.totalPrice.$numberDecimal), 0).toFixed(2)}</strong></p>
                </div>
            </div>
            </body>
            </html>
        `;

        try {
            const res = await fetch("/api/export-pdf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ htmlContent: htmlContent }),
            });

            if (res.ok) {
                const blob = await res.blob();
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = getFileName(selectedCompany, selectedMonth, filteredOrders, "pdf");
                link.click();
            } else {
                alert("Failed to generate PDF");
            }
        } catch (error) {
            console.error("Error exporting PDF:", error);
        }
    };

    const handleEditOrder = (order) => {
        router.push(`/sales/${order._id}/edit`);
    };

    const handleDeleteOrder = async (orderId) => {
        const confirmDelete = confirm("Are you sure you want to delete this order?");

        if (!confirmDelete) return;

        const res = await fetch("/api/orders", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: orderId }),
        });

        if (!res.ok) {
            alert("Failed to delete order");
            return;
        } else {
            alert("Order has been deleted successfully!");
            fetchOrders();
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="h-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Sales</h1>
                <div className="space-x-4 flex ">
                    {/* Excel */}
                    <button onClick={exportToCSV} className="flex px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700" title="Export to Excel">
                        <ArrowDownToLine width={18} className="mr-2" /> Excel
                    </button>

                    {/* PDF */}
                    <button onClick={exportToPDF} className="flex px-4 py-2 bg-yellow-600 text-white font-medium rounded-lg shadow-md hover:bg-yellow-700" title="Export to PDF">
                        <FileDown width={18} className="mr-2" /> PDF
                    </button>
                </div>
            </div>

            <div className="flex gap-4">
                {/* Search Input Invoice No */}
                <input
                    type="text"
                    placeholder="Search by Invoice No"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 rounded-md w-full max-w-md"
                />

                {/* Company Filter */}
                <select value={selectedCompany} onChange={handleCompanyChange} className="p-2 border border-gray-300 rounded-md w-full max-w-xs">
                    <option value="">All Companies</option>
                    {uniqueCompanies.map((company) => (
                        <option key={company._id} value={company._id}>
                            {company.name}
                        </option>
                    ))}
                </select>

                {/* Month Filter */}
                <select value={selectedMonth} onChange={handleMonthChange} className="p-2 border border-gray-300 rounded-md w-full max-w-xs">
                    <option value="">All Months</option>
                    {uniqueMonths.map((month, index) => (
                        <option key={index} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            <div className="bg-white shadow-md rounded-lg px-6 py-6 max-w-6xl mx-auto">
                <SalesTracking orders={currentData} handleEditOrder={handleEditOrder} handleDeleteOrder={handleDeleteOrder} />
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default SalesPage;
