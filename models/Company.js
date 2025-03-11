import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  ssmNumber: { type: String, required: true },
  phoneNumber: { type: Number, required: true }
});

const Company = mongoose.models.Company || mongoose.model('Company', CompanySchema);

export default Company;
