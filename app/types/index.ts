// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  verified: boolean;
  kyc: KYCStatus;
  createdAt: string;
}

export type KYCStatus = 'pending' | 'approved' | 'rejected';

// Investment Types
export interface Investment {
  id: string;
  name: string;
  type: 'stock' | 'bond' | 'fund' | 'crypto';
  symbol: string;
  currentPrice: number;
  change24h: number;
  changePercent24h: number;
  description: string;
  logo?: string;
}

export interface PortfolioItem {
  id: string;
  investmentId: string;
  investment: Investment;
  quantity: number;
  purchasePrice: number;
  currentValue: number;
  gain: number;
  gainPercent: number;
  purchaseDate: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  totalValue: number;
  totalInvested: number;
  totalGain: number;
  gainPercent: number;
  items: PortfolioItem[];
  updatedAt: string;
}

// Transaction Types
export type TransactionType = 'deposit' | 'withdrawal' | 'buy' | 'sell';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  paymentMethod?: PaymentMethod;
  description: string;
  createdAt: string;
  completedAt?: string;
}

export type PaymentMethod = 'gcash' | 'maya' | 'bank_transfer';

export interface PaymentGateway {
  id: string;
  method: PaymentMethod;
  accountName: string;
  accountNumber: string;
  fee: number;
  minAmount: number;
  maxAmount: number;
  enabled: boolean;
}

// Auth Types
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface OTPVerification {
  email: string;
  otp: string;
}
