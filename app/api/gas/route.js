import { connectToDatabase } from "../../../lib/mongodb";
import Gas from "../../../models/Gas";

export async function GET(req) {
    try {
        await connectToDatabase();
        const gasTypes = await Gas.find({});
        return new Response(JSON.stringify(gasTypes), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch gas types", { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const newGas = new Gas(body);
        await newGas.save();
        return new Response(JSON.stringify(newGas), { status: 201 });
    } catch (error) {
        return new Response("Failed to create gas type", { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const updatedGas = await Gas.findByIdAndUpdate(body._id, body, { new: true });
        return new Response(JSON.stringify(updatedGas), { status: 200 });
    } catch (error) {
        return new Response("Failed to update gas type", { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const body = await req.json();
        await Gas.findByIdAndDelete(body._id);
        return new Response("Gas type deleted", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete gas type", { status: 500 });
    }
}
