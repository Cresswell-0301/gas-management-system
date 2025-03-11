"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Navigation = () => {
    const pathname = usePathname();

    const getLinkClassNames = (path) => {
        const isActive = pathname === path;
        return `block py-2 px-4 rounded-lg text-lg transition duration-300 ${isActive ? "bg-gray-200 text-gray-700" : "text-blue-500 hover:bg-blue-100 hover:text-blue-700"}`;
    };

    return (
        <nav className="w-64 bg-white shadow-lg rounded-lg p-6 fixed left-0 top-0 h-full">
            <ul className="space-y-4">
                <li>
                    <Link href="/admin">
                        <span className={getLinkClassNames("/admin")}>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/companies">
                        <span className={getLinkClassNames("/admin/companies")}>Companies</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/gas">
                        <span className={getLinkClassNames("/admin/gas")}>Gas Types</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/sales">
                        <span className={getLinkClassNames("/admin/sales")}>Sales Tracking</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/users">
                        <span className={getLinkClassNames("/admin/users")}>Users</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
