import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, PaymentGateway } from '@types/index';

interface PaymentState {
  transactions: Transaction[];
  paymentMethods: PaymentGateway[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  transactions: [],
  paymentMethods: [],
  isLoading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    setPaymentMethods: (state, action: PayloadAction<PaymentGateway[]>) => {
      state.paymentMethods = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setTransactions, addTransaction, setPaymentMethods, setLoading, setError, clearError } = paymentSlice.actions;
export default paymentSlice.reducer;
