import { apiClient } from './api';
import { Transaction, PaymentGateway } from '@types/index';

class PaymentService {
  async getPaymentMethods(): Promise<PaymentGateway[]> {
    const response = await apiClient.getPaymentMethods();
    return response.data.methods;
  }

  async initiateDeposit(amount: number, method: 'gcash' | 'maya'): Promise<Transaction> {
    const response = await apiClient.initiateDeposit(amount, method);
    return response.data.transaction;
  }

  async initiateWithdrawal(amount: number, method: 'gcash' | 'maya'): Promise<Transaction> {
    const response = await apiClient.initiateWithdrawal(amount, method);
    return response.data.transaction;
  }

  async getTransactionHistory(limit: number = 20, offset: number = 0): Promise<Transaction[]> {
    const response = await apiClient.getTransactionHistory(limit, offset);
    return response.data.transactions;
  }
}

export const paymentService = new PaymentService();
