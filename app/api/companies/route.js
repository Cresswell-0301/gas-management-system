import { connectToDatabase } from "@/lib/mongodb";
import Company from "@/models/Company";

export async function GET(req) {
    try {
        await connectToDatabase();
        const companies = await Company.find({});
        return new Response(JSON.stringify(companies), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch companies", { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const newCompany = new Company(body);
        await newCompany.save();
        return new Response(JSON.stringify(newCompany), { status: 201 });
    } catch (error) {
        return new Response("Failed to create company", { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const updatedCompany = await Company.findByIdAndUpdate(body._id, body, { new: true });
        return new Response(JSON.stringify(updatedCompany), { status: 200 });
    } catch (error) {
        return new Response("Failed to update company", { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const body = await req.json();
        await Company.findByIdAndDelete(body._id);
        return new Response("Company deleted", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete company", { status: 500 });
    }
}
