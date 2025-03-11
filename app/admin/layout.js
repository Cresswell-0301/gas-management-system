import Navigation from "@/components/Navigation";

import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: process.env.COMPANY_NAME,
    description: `${process.env.COMPANY_NAME} Admin Panel`,
};

export default function AdminLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <div className="flex min-h-screen">
                    <Navigation />
                    <div className="ml-64 w-full p-8">{children}</div>
                </div>
            </body>
        </html>
    );
}
