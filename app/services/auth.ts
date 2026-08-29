import * as SecureStore from 'expo-secure-store';
import { apiClient } from './api';
import { User } from '@types/index';

class AuthService {
  async login(email: string, password: string): Promise<{ user: User; token: string; refreshToken: string }> {
    const response = await apiClient.login(email, password);
    const { user, token, refreshToken } = response.data;

    await SecureStore.setItemAsync('authToken', token);
    await SecureStore.setItemAsync('refreshToken', refreshToken);

    return { user, token, refreshToken };
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
  ): Promise<{ user: User; token: string }> {
    const response = await apiClient.register(email, password, firstName, lastName, phone);
    const { user, token } = response.data;

    return { user, token };
  }

  async verifyOTP(email: string, otp: string): Promise<{ user: User; token: string; refreshToken: string }> {
    const response = await apiClient.verifyOTP(email, otp);
    const { user, token, refreshToken } = response.data;

    await SecureStore.setItemAsync('authToken', token);
    await SecureStore.setItemAsync('refreshToken', refreshToken);

    return { user, token, refreshToken };
  }

  async logout() {
    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('refreshToken');
  }

  async getStoredToken(): Promise<string | null> {
    return await SecureStore.getItemAsync('authToken');
  }
}

export const authService = new AuthService();
