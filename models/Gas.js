import mongoose from 'mongoose';

const GasSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: mongoose.Types.Decimal128, required: true }
});

const Gas = mongoose.models.Gas || mongoose.model('Gas', GasSchema);

export default Gas;
