import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, AuthResponse } from '@/services/api';

interface User {
  _id: string;
  email: string;
  userName?: string;
  phoneNumber?: string;
  accountBalance?: {
    $numberDecimal: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  signup: (email: string, password: string) => Promise<AuthResponse>;
  signin: (email: string, password: string) => Promise<AuthResponse>;
  addPhoneNumber: (phoneNumber: string) => Promise<AuthResponse>;
  addUsername: (userName: string) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Still load saved user data, but don't enforce authentication
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const signup = async (email: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await authApi.signup({ email, password });
      
      // Check for successful status using the updated structure
      if (response.status === 'success' && response.data?.user) {
        // Set user from data.user
        setUser(response.data.user);
        
        // Handle token - might be in different places depending on API
        const responseToken = response.token || response.data?.token;
        if (responseToken) {
          setToken(responseToken);
          localStorage.setItem('token', responseToken);
        }
        
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Store the user ID separately for operations that need it
        localStorage.setItem('userId', response.data.user._id);
      } else {
        setError(response.message || 'Signup failed');
      }
      
      setLoading(false);
      return response;
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'An error occurred during signup');
      throw err;
    }
  };

  const signin = async (email: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await authApi.signin({ email, password });
      
      if (response.status === 'success' && response.data?.user) {
        setUser(response.data.user);
        
        // Handle token - might be in different places
        const responseToken = response.token || response.data?.token;
        if (responseToken) {
          setToken(responseToken);
          localStorage.setItem('token', responseToken);
        }
        
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userId', response.data.user._id);
      } else {
        setError(response.message || 'Signin failed');
      }
      
      setLoading(false);
      return response;
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'An error occurred during signin');
      throw err;
    }
  };

  const addPhoneNumber = async (phoneNumber: string): Promise<AuthResponse> => {
    const userId = user?._id || localStorage.getItem('userId') || '';
    
    if (!userId) {
      console.error("Missing user ID for adding phone number");
      throw new Error('User ID not available');
    }
    
    try {
      const response = await authApi.addPhoneNumber(userId, { phoneNumber });
      
      if (response.status === 'success' && response.data?.user) {
        // Update user with new data
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return response;
    } catch (err: any) {
      console.error("Error in addPhoneNumber:", err);
      setError(err.message || 'Failed to add phone number');
      throw err;
    }
  };

  const addUsername = async (userName: string): Promise<AuthResponse> => {
    const userId = user?._id || localStorage.getItem('userId') || '';
    
    if (!userId) {
      console.error("Missing user ID for adding username");
      throw new Error('User ID not available');
    }
    
    try {
      const response = await authApi.addUsername(userId, { userName });
      
      if (response.status === 'success' && response.data?.user) {
        // Update user with new data
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return response;
    } catch (err: any) {
      console.error("Error in addUsername:", err);
      setError(err.message || 'Failed to add username');
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        signup,
        signin,
        addPhoneNumber,
        addUsername,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
