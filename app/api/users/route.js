import { connectToDatabase } from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcrypt";

export async function GET() {
    try {
        await connectToDatabase();
        const users = await User.find({});
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch users", { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { username, email, password } = body;

        const existingUser = await User.findOne({ email }).exec();

        if (existingUser) {
            return new Response("User already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return new Response("User crested successfully", { status: 201 });
    } catch (error) {
        return new Response("Failed to create user", { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const { _id, updateData } = body;

        const updatedUser = await User.findByIdAndUpdate(_id, updateData, { new: true });
        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        return new Response("Failed to update user", { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const body = await req.json();
        const { userId } = body;

        await User.findByIdAndDelete(userId);
        return new Response("User deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete user", { status: 500 });
    }
}
