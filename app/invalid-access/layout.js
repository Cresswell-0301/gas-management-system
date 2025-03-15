import "../globals.css";

export const metadata = {
    title: "Invalid Device",
    description: `${process.env.COMPANY_NAME} Invalid Device`,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
