import { connectToDatabase } from "../../../../lib/mongodb";
import Order from "../../../../models/Order";

export async function GET(req, { params }) {
    const { orderId } = params;
    try {
        await connectToDatabase();

        const order = await Order.findById(orderId);

        if (!order) {
            return new Response("Order not found", { status: 404 });
        }

        return new Response(JSON.stringify(order), { status: 200 });
    } catch (error) {
        return new Response("Error fetching the order", { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { orderId } = params;
    const { companyId, gasType, quantity, pricePerGas, totalPrice } = await req.json();

    try {
        await connectToDatabase();

        const order = await Order.findById(orderId);

        if (!order) {
            return new Response("Order not found", { status: 404 });
        }

        order.companyId = companyId || order.companyId;
        order.gasType = gasType || order.gasType;
        order.quantity = quantity || order.quantity;
        order.pricePerGas = pricePerGas || order.pricePerGas;
        order.totalPrice = totalPrice || order.totalPrice;

        await order.save();

        return new Response(JSON.stringify(order), { status: 200 });
    } catch (error) {
        return new Response("Error updating the order", { status: 500 });
    }
}
