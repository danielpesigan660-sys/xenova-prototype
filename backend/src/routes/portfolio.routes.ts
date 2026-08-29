import express from 'express';
import Portfolio from '../models/Portfolio';
import Investment from '../models/Investment';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Get User Portfolio
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.userId;

    let portfolio = await Portfolio.findOne({ userId }).populate('items.investmentId');

    if (!portfolio) {
      portfolio = new Portfolio({ userId, items: [] });
      await portfolio.save();
    }

    res.json({ portfolio });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio' });
  }
});

// Get Available Investments
router.get('/investments/available', async (req, res) => {
  try {
    const investments = await Investment.find({ enabled: true });
    res.json({ investments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching investments' });
  }
});

// Buy Investment
router.post('/invest', authMiddleware, async (req, res) => {
  try {
    const { investmentId, quantity } = req.body;
    const userId = req.user?.userId;

    const investment = await Investment.findById(investmentId);
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    let portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      portfolio = new Portfolio({ userId, items: [] });
    }

    const investmentCost = investment.currentPrice * quantity;
    const portfolioItem = {
      investmentId,
      quantity,
      purchasePrice: investment.currentPrice,
      currentValue: investmentCost,
      gain: 0,
      gainPercent: 0,
      purchaseDate: new Date(),
    };

    portfolio.items.push(portfolioItem as any);
    portfolio.totalInvested += investmentCost;
    portfolio.totalValue += investmentCost;

    await portfolio.save();

    res.json({ portfolio });
  } catch (error) {
    res.status(500).json({ message: 'Error buying investment' });
  }
});

export default router;
