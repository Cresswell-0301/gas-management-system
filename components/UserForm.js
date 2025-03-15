import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordViewIcon({ isPasswordVisible }) {
    return isPasswordVisible ? <FaEyeSlash className="w-5 h-5 text-gray-600" /> : <FaEye className="w-5 h-5 text-gray-600" />;
}

const UserForm = ({ onSubmit, initialData = {} }) => {
    const [username, setUsername] = useState(initialData?.username || "");
    const [email, setEmail] = useState(initialData?.email || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSubmit = (e) => {
        toast.dismiss();

        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords don't match!");
            return;
        }

        const userData = { username, email, password };
        onSubmit(userData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            {/* Username Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Email Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Password Input */}
            <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Password:</label>
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute top-9 right-3 cursor-pointer" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <PasswordViewIcon isPasswordVisible={isPasswordVisible} />
                </div>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute top-9 right-3 cursor-pointer" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <PasswordViewIcon isPasswordVisible={isPasswordVisible} />
                </div>
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {initialData?._id ? "Update" : "Create"} User
                </button>
            </div>
        </form>
    );
};

export default UserForm;
