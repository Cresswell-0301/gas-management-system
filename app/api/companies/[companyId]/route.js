import { connectToDatabase } from "@/lib/mongodb";
import Company from "@/models/Company";

export async function GET(req, { params }) {
    const { companyId } = params;

    try {
        await connectToDatabase();

        const company = await Company.findById(companyId);

        if (!company) {
            return new Response("Company not found", { status: 404 });
        }

        return new Response(JSON.stringify(company), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Error fetching company", { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { companyId } = params;
    const { name, phoneNumber, address, ssmNumber } = await req.json();
    try {
        await connectToDatabase();

        const company = await Company.findByIdAndUpdate(companyId, { name, phoneNumber, address, ssmNumber }, { new: true });

        if (!company) {
            return new Response("Company not found", { status: 404 });
        }

        return new Response(JSON.stringify(company), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Error updating company", { status: 500 });
    }
}
