"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { BadgeDollarSign, Building, Cylinder, SquarePlus, UserRound } from "lucide-react";

const Navigation = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);

    const getLinkClassNames = (path) => {
        const isActive = pathname === path;
        return `block py-2 px-4 rounded-lg text-lg transition duration-300 ${isActive ? "bg-gray-200 text-gray-700" : "text-blue-500 hover:bg-blue-100 hover:text-blue-700"}`;
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav ref={navRef} className={`w-fit ${isOpen ? "bg-white" : "bg-transparent"}  shadow-lg rounded-lg p-6 fixed left-0 top-0 h-full z-20`}>
            <div className="block lg:hidden mb-6">
                <button onClick={toggleMenu} className="text-2xl text-blue-600 focus:outline-none">
                    {isOpen ? "✖" : "☰"}
                </button>
            </div>

            <div className={`lg:block ${isOpen ? "block" : "hidden"} lg:mt-0 mt-8`}>
                <ul className="space-y-4">
                    <li>
                        <Link href="/">
                            <span className={getLinkClassNames("/")}>
                                <div className="flex items-center gap-2">
                                    <SquarePlus />
                                    Orders
                                </div>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/sales">
                            <span className={getLinkClassNames("/sales")}>
                                <div className="flex items-center gap-2">
                                    <BadgeDollarSign />
                                    Sales
                                </div>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/companies">
                            <span className={getLinkClassNames("/companies")}>
                                <div className="flex items-center gap-2">
                                    <Building />
                                    Companies
                                </div>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/gas">
                            <span className={getLinkClassNames("/gas")}>
                                <div className="flex items-center gap-2">
                                    <Cylinder />
                                    Gas
                                </div>
                            </span>
                        </Link>
                    </li>
                    {/* <li>
                        <Link href="/users">
                            <span className={getLinkClassNames("/users")}>
                                <div className="flex items-center gap-2">
                                    <UserRound />
                                    Users
                                </div>
                            </span>
                        </Link>
                    </li> */}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
