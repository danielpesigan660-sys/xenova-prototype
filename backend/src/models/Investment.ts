import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['stock', 'bond', 'fund', 'crypto'], required: true },
    symbol: { type: String, required: true, unique: true },
    currentPrice: { type: Number, required: true },
    change24h: { type: Number, default: 0 },
    description: { type: String },
    logo: { type: String },
    enabled: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Investment', investmentSchema);
