"use client";

import CheckEmailAccess from "@/controller/CheckEmailAccess";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InvalidPage() {
    const access = CheckEmailAccess();
    const router = useRouter();
    const { signOut } = useClerk();

    useEffect(() => {
        signOut();
    }, []);

    return (
        <div className="h-full flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-gray-700">Access Denied</h1>
                <p className="text-gray-600 mt-4">You are not allowed to access this page.</p>
                <button
                    onClick={() => access && router.push("/")}
                    className={`mt-6 px-4 py-2  text-white rounded-md  ${!access ? `bg-gray-400 hover:bg-gray-700` : `bg-blue-600 hover:bg-blue-700`}`}
                >
                    {access ? "Back to Home" : "Contact Support"}
                </button>
            </div>
        </div>
    );
}
