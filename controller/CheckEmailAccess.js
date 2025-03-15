import { useClerk } from "@clerk/nextjs";

const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAIL.split(",").map((email) => email.trim());

let signedEmail = "";

function CheckEmailAccess() {
    const { user } = useClerk();

    signedEmail = user?.emailAddresses[0]?.emailAddress;

    if (user && !allowedEmails.includes(signedEmail)) {
        return false;
    } else {
        return true;
    }
}

export default CheckEmailAccess;
