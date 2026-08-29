import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Portfolio, Investment, PortfolioItem } from '@types/index';

interface PortfolioState {
  portfolio: Portfolio | null;
  investments: Investment[];
  isLoading: boolean;
  error: string | null;
  watchlist: Investment[];
}

const initialState: PortfolioState = {
  portfolio: null,
  investments: [],
  isLoading: false,
  error: null,
  watchlist: [],
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setPortfolio: (state, action: PayloadAction<Portfolio>) => {
      state.portfolio = action.payload;
    },
    setInvestments: (state, action: PayloadAction<Investment[]>) => {
      state.investments = action.payload;
    },
    addToWatchlist: (state, action: PayloadAction<Investment>) => {
      if (!state.watchlist.find(inv => inv.id === action.payload.id)) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.watchlist = state.watchlist.filter(inv => inv.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addPortfolioItem: (state, action: PayloadAction<PortfolioItem>) => {
      if (state.portfolio) {
        state.portfolio.items.push(action.payload);
      }
    },
  },
});

export const { setPortfolio, setInvestments, addToWatchlist, removeFromWatchlist, setLoading, setError, addPortfolioItem } = portfolioSlice.actions;
export default portfolioSlice.reducer;
