import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";

export const metadata = {
    title: "Invalid Device",
    description: `${process.env.COMPANY_NAME} Invalid Device`,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ClerkProvider>{children}</ClerkProvider>
            </body>
        </html>
    );
}
