import { SignUp } from "@clerk/nextjs";

export default function Register() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <SignUp />
        </div>
    );
}
