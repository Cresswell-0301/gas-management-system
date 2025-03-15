"use client";

import { SignIn } from "@clerk/nextjs";

export default function Login() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <SignIn />
        </div>
    );
}
