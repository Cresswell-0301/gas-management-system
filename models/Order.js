import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    invoiceNumber: { type: String, required: false },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    gasType: { type: mongoose.Schema.Types.ObjectId, ref: "Gas", required: true },
    pricePerGas: { type: mongoose.Types.Decimal128, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: mongoose.Types.Decimal128, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
});

OrderSchema.pre("save", function (next) {
    this.created_at = new Date(this.created_at.setHours(this.created_at.getHours() + 8));
    next();
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
