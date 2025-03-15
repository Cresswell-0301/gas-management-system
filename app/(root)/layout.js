import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navigation from "../../components/Navigation";
import { Toaster } from "react-hot-toast";

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
    description: `${process.env.COMPANY_NAME} Place Order Panel`,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ClerkProvider>
                    <Toaster />
                    <div className="flex h-full">
                        <Navigation />
                        <div className="lg:ml-64 ml-0 w-full p-8 transition-all duration-300 ease-in-out">{children}</div>
                    </div>
                </ClerkProvider>
            </body>
        </html>
    );
}
