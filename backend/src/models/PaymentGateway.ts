import mongoose from 'mongoose';

const paymentGatewaySchema = new mongoose.Schema(
  {
    method: { type: String, enum: ['gcash', 'maya'], required: true, unique: true },
    accountName: String,
    accountNumber: String,
    fee: { type: Number, default: 0 },
    minAmount: { type: Number, default: 100 },
    maxAmount: { type: Number, default: 100000 },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('PaymentGateway', paymentGatewaySchema);
