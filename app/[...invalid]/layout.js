import "../globals.css";

export const metadata = {
    title: "Page Not Found",
    description: `${process.env.COMPANY_NAME} 404 Not Found`,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
