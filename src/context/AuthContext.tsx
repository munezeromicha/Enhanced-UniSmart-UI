// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/user.types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const savedRole = localStorage.getItem('userRole');
        if (token && savedRole) {
          setUser({
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: savedRole as UserRole
          });
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      let userRole: UserRole;
      
      // Determine user role from email
      if (email.includes('admin') || email.includes('dean')) {
        userRole = 'dean';  // dean is our admin role
      } else if (email.includes('lecturer')) {
        userRole = 'lecturer';
      } else if (email.includes('hod')) {
        userRole = 'hod';
      } else {
        userRole = 'student';
      }

      const mockUser = {
        id: '1',
        name: email.includes('admin') ? 'Admin User' : 'John Doe',
        email,
        role: userRole
      };
      
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('userRole', userRole);
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;