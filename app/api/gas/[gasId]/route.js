import { connectToDatabase } from "@/lib/mongodb";
import Gas from "@/models/Gas";

export async function GET(req, { params }) {
    const { gasId } = params;

    try {
        await connectToDatabase();

        const gas = await Gas.findById(gasId);

        if (!gas) {
            return new Response("Gas not found", { status: 404 });
        }

        return new Response(JSON.stringify(gas), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch gas", { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { gasId } = params;
    const body = await req.json();

    try {
        await connectToDatabase();

        const updatedGas = await Gas.findByIdAndUpdate(gasId, body, { new: true });

        if (!updatedGas) {
            return new Response("Gas not found", { status: 404 });
        }

        return new Response(JSON.stringify(updatedGas), { status: 200 });
    } catch (error) {
        return new Response("Failed to update gas", { status: 500 });
    }
}
