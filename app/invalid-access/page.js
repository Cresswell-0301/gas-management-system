export default function InvalidPage() {
    return (
        <div className="h-full flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-gray-700">Access Denied</h1>
                <p className="text-gray-600 mt-4">You are not allowed to access this page.</p>
            </div>
        </div>
    );
}
