import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req) {
    const { htmlContent } = await req.json();

    if (!htmlContent) {
        return NextResponse.json({ message: "No HTML content provided." }, { status: 400 });
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdfBuffer = await page.pdf({ format: "A4" });

        return new NextResponse(pdfBuffer, {
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
