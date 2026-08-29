import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['deposit', 'withdrawal', 'buy', 'sell'], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'cancelled'], default: 'pending' },
    paymentMethod: { type: String, enum: ['gcash', 'maya', 'bank_transfer'] },
    description: String,
    reference: String,
    createdAt: { type: Date, default: Date.now },
    completedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', transactionSchema);
