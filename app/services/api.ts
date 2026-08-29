import axios, { AxiosInstance } from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api';

class APIClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });

    // Add token to requests
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await SecureStore.getItemAsync('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // Auth
  async register(email: string, password: string, firstName: string, lastName: string, phone: string) {
    return this.axiosInstance.post('/auth/register', {
      email,
      password,
      firstName,
      lastName,
      phone,
    });
  }

  async login(email: string, password: string) {
    return this.axiosInstance.post('/auth/login', { email, password });
  }

  async verifyOTP(email: string, otp: string) {
    return this.axiosInstance.post('/auth/verify-otp', { email, otp });
  }

  // Portfolio
  async getPortfolio() {
    return this.axiosInstance.get('/portfolio');
  }

  async getInvestments() {
    return this.axiosInstance.get('/investments/available');
  }

  async buyInvestment(investmentId: string, quantity: number) {
    return this.axiosInstance.post('/portfolio/invest', { investmentId, quantity });
  }

  async sellInvestment(portfolioItemId: string, quantity: number) {
    return this.axiosInstance.post(`/portfolio/${portfolioItemId}/sell`, { quantity });
  }

  // Payments
  async getPaymentMethods() {
    return this.axiosInstance.get('/payments/methods');
  }

  async initiateDeposit(amount: number, method: string) {
    return this.axiosInstance.post('/payments/deposit', { amount, method });
  }

  async initiateWithdrawal(amount: number, method: string) {
    return this.axiosInstance.post('/payments/withdraw', { amount, method });
  }

  async getTransactionHistory(limit: number = 20, offset: number = 0) {
    return this.axiosInstance.get('/payments/history', { params: { limit, offset } });
  }

  // User
  async getUserProfile() {
    return this.axiosInstance.get('/users/profile');
  }

  async updateProfile(data: any) {
    return this.axiosInstance.put('/users/profile', data);
  }
}

export const apiClient = new APIClient();
