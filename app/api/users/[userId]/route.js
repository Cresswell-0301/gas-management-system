import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req, { params }) {
    const { userId } = params;

    try {
        await connectToDatabase();

        const user = await User.findById(userId);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch user", { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { userId } = params;
    const body = await req.json();

    try {
        await connectToDatabase();

        const updatedUser = await User.findByIdAndUpdate(userId, body, { new: true });

        if (!updatedUser) {
            return new Response("User not found", { status: 404 });
        }

        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        return new Response("Failed to update user", { status: 500 });
    }
}
