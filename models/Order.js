import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  gasType: { type: mongoose.Schema.Types.ObjectId, ref: 'Gas', required: true },
  pricePerGas: { type: mongoose.Types.Decimal128, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: mongoose.Types.Decimal128, required: true },
  invoice: { type: Boolean, default: false }
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;
