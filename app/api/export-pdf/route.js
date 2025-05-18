import { NextResponse } from "next/server";

export async function POST(req) {
    const { htmlContent } = await req.json();

    if (!htmlContent) {
        return NextResponse.json({ message: "No HTML content provided." }, { status: 400 });
    }

    try {
        const browserlessApiKey = process.env.BROWSERLESS_API_KEY;

        const response = await fetch(`https://chrome.browserless.io/pdf?token=${browserlessApiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ html: htmlContent }),
        });

        if (!response.ok) {
            throw new Error("Browserless API error");
        }

        const pdfBuffer = await response.arrayBuffer();

        return new NextResponse(Buffer.from(pdfBuffer), {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="sales_report.pdf"',
            },
        });
    } catch (error) {
        console.error("Error generating PDF:", error);
        return NextResponse.json({ message: "Error generating PDF", error: error.message }, { status: 500 });
    }
}
