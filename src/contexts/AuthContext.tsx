import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User, AuthCredentials, AuthResponse, AuthState } from '../types';
import API from '../services/api';

export const AuthContext = createContext<AuthState>({
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  login: async () => {
    throw new Error('AuthContext not initialized');
  },
  logout: () => {
  }
});

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('auth_user');
      
      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } catch (error) {
          // If there's an error parsing stored user, clear storage
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          setUser(null);
          setToken(null);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // Login function
  const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await API.login(credentials);
      
      // Store auth data
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
      
      setUser(response.user);
      setToken(response.token);
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
    setToken(null);
  };
  
  // Auth context value
  const value: AuthState = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!token
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use auth context
 */
export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

