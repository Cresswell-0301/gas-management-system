"use client";

import ActionComponent from "./ActionComponent";

const SalesTracking = ({ orders, handleEditOrder, handleDeleteOrder }) => {
    const exportToPDF = async (order) => {
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
                        <h1 style="margin: 10px 0px;">Invoice ${order.invoiceNumber.slice(4)}</h1>
                        <h4>Win Hang Enterprise</h4>
                        <p style="padding-top: 8px;">No 52 Jln PUJ 5/7<br>Tmn Puncak Jalil<br>43300 Seri Kembangan<br> Selengor</p>
                        <p style="padding-top: 8px;">+6017-626 6883</p>
                    </div>
                </div>

                <div class="client-info">
                    <div class="client-address">
                        <h2>${order.companyId.name}</h2>
                        <p style="padding-top: 8px;">(${order.companyId.ssmNumber})</p>
                        <p style="padding-top: 8px;">${order.companyId.address}</p>
                        <p style="padding-top: 8px;">${order.companyId.phoneNumber}</p>
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
                            <th>Date</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Unit Price (RM)</th>
                            <th>Amount (RM)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${new Date(new Date(order.created_at).getTime() - 8 * 60 * 60 * 1000).toLocaleString("en-MY", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}</td>
                            <td>${order.gasType.type}</td>
                            <td>${order.quantity}</td>
                            <td>${order.gasType.price.$numberDecimal}</td>
                            <td>${order.totalPrice.$numberDecimal}</td>
                        </tr>
                    </tbody>
                </table>

                <div style="border-bottom: 1px solid #000; margin-bottom: 20px;"></div>

                <div class="total-due">
                    <p>Total Due: <strong>RM ${order.totalPrice.$numberDecimal}</strong></p>
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
                link.download = `${order.invoiceNumber}.pdf`;
                link.click();
            } else {
                alert("Failed to generate PDF");
            }
        } catch (error) {
            console.error("Error exporting PDF:", error);
        }
    };

    return (
        <div>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Invoice</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Date</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Company</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Gas</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Price (RM)</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Quantity</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Total (RM)</th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-100">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="px-4 py-4 text-center text-gray-600">
                                Currently, you don't have any orders yet.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-800">{order.invoiceNumber.slice(4)}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">
                                    {new Date(new Date(order.created_at).getTime() - 8 * 60 * 60 * 1000).toLocaleString("en-MY", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800">{order.companyId?.name}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">{order.gasType?.type}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 text-right">{order.gasType.price.$numberDecimal}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 text-right">{order.quantity}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 text-right">{parseFloat(order.totalPrice.$numberDecimal).toFixed(2)}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <ActionComponent handleEdit={handleEditOrder} handleDelete={handleDeleteOrder} data={order} type={"pdf"} exportToPDF={exportToPDF} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTracking;
