import express from 'express';
import Transaction from '../models/Transaction';
import User from '../models/User';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Get Payment Methods
router.get('/methods', async (req, res) => {
  try {
    const methods = await require('../models/PaymentGateway').find({ enabled: true });
    res.json({ methods });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment methods' });
  }
});

// Initiate Deposit
router.post('/deposit', authMiddleware, async (req, res) => {
  try {
    const { amount, method } = req.body;
    const userId = req.user?.userId;

    const transaction = new Transaction({
      userId,
      type: 'deposit',
      amount,
      paymentMethod: method,
      status: 'pending',
      description: `Deposit via ${method}`,
    });

    await transaction.save();

    // TODO: Call GCash/Maya API to initiate payment

    res.json({ transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error initiating deposit' });
  }
});

// Initiate Withdrawal
router.post('/withdraw', authMiddleware, async (req, res) => {
  try {
    const { amount, method } = req.body;
    const userId = req.user?.userId;

    const user = await User.findById(userId);
    if (!user || user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const transaction = new Transaction({
      userId,
      type: 'withdrawal',
      amount,
      paymentMethod: method,
      status: 'pending',
      description: `Withdrawal to ${method}`,
    });

    await transaction.save();

    // TODO: Call GCash/Maya API to process withdrawal

    res.json({ transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error initiating withdrawal' });
  }
});

// Get Transaction History
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { limit = 20, offset = 0 } = req.query;

    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(offset));

    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transaction history' });
  }
});

export default router;
