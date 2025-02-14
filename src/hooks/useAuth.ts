import { useState, useEffect, useCallback } from 'react';
import { User } from '../types/user.types';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setState({ user: null, loading: false, error: null });
        return;
      }

      const user = await authService.getCurrentUser();
      setState({ user, loading: false, error: null });
    } catch (error) {
      setState({ user: null, loading: false, error: 'Authentication failed' });
      localStorage.removeItem('authToken');
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const user = await authService.login(email, password);
      setState({ user, loading: false, error: null });
      navigate('/dashboard');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Invalid credentials',
      }));
      throw error;
    }
  };

  const logout = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      await authService.logout();
      setState({ user: null, loading: false, error: null });
      navigate('/login');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Logout failed',
      }));
    }
  };

  const updateUser = (userData: Partial<User>) => {
    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...userData } : null,
    }));
  };

  return {
    ...state,
    login,
    logout,
    updateUser,
    isAuthenticated: !!state.user,
  };
};