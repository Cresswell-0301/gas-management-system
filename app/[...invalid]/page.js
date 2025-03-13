"use client";

import { useRouter } from "next/navigation";

const Custom404 = () => {
    const router = useRouter();

    return (
        <div className="h-full flex items-center justify-center bg-gray-50">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-red-600">404 - Not Found</h1>
                <p className="mt-4 text-lg text-gray-600">Oops! The page you are looking for does not exist.</p>
                <button onClick={() => router.push("/")} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Custom404;
