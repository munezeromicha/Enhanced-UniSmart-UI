// src/services/auth.service.ts
import api from './api';
import { User } from '../types/user.types';

interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      return user;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid credentials');
      }
      throw new Error('Login failed');
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('authToken');
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      localStorage.removeItem('authToken');
      throw error;
    }
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put<User>('/auth/profile', userData);
    return response.data;
  },

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await api.put('/auth/password', { oldPassword, newPassword });
  },

  async resetPassword(email: string): Promise<void> {
    await api.post('/auth/reset-password', { email });
  },

  async verifyResetToken(token: string): Promise<boolean> {
    try {
      await api.get(`/auth/verify-reset-token/${token}`);
      return true;
    } catch {
      return false;
    }
  },

  async setNewPassword(token: string, newPassword: string): Promise<void> {
    await api.post('/auth/set-new-password', { token, newPassword });
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  },
};