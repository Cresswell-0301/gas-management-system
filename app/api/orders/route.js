import { connectToDatabase } from "../../../lib/mongodb";
import Order from "../../../models/Order";

const generateInvoiceNumber = async () => {
    const lastOrder = await Order.findOne().sort({ invoiceNumber: -1 });

    let invoiceNumber = "000001";

    if (lastOrder && lastOrder.invoiceNumber) {
        const lastInvoiceNumber = lastOrder.invoiceNumber.split("-")[1];

        let newInvoiceNumber = parseInt(lastInvoiceNumber, 10) + 1;

        invoiceNumber = newInvoiceNumber.toString().padStart(6, "0");
    }

    return `Inv-${invoiceNumber}`;
};

export async function GET() {
    try {
        await connectToDatabase();
        const orders = await Order.find({}).populate("companyId").populate("gasType");
        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch orders", { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();

        const newOrder = new Order(body);

        newOrder.invoiceNumber = await generateInvoiceNumber();

        newOrder.totalPrice = (newOrder.pricePerGas * newOrder.quantity).toFixed(2);

        await newOrder.save();

        return new Response(JSON.stringify(newOrder), { status: 201 });
    } catch (error) {
        return new Response("Failed to create order", { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const updatedOrder = await Order.findByIdAndUpdate(body._id, body, { new: true });
        return new Response(JSON.stringify(updatedOrder), { status: 200 });
    } catch (error) {
        return new Response("Failed to update order", { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const body = await req.json();
        await Order.findByIdAndDelete(body._id);
        return new Response("Order deleted", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete order", { status: 500 });
    }
}
