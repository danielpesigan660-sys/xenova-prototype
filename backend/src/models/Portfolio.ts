import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        investmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Investment' },
        quantity: Number,
        purchasePrice: Number,
        currentValue: Number,
        gain: Number,
        gainPercent: Number,
        purchaseDate: Date,
      },
    ],
    totalValue: { type: Number, default: 0 },
    totalInvested: { type: Number, default: 0 },
    totalGain: { type: Number, default: 0 },
    gainPercent: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Portfolio', portfolioSchema);
