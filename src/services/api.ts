
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = 'https://miniopay.onrender.com';

// Types
interface SignupData {
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface PhoneNumberData {
  phoneNumber: string;
}

interface UsernameData {
  username: string;
}

// API Endpoints
export const signupUser = async (userData: SignupData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to signup');
    }
    
    return data;
  } catch (error) {
    console.error('Signup error:', error);
    if (error instanceof Error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
    }
    throw error;
  }
};

export const loginUser = async (credentials: SignInData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to login');
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof Error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
    throw error;
  }
};

export const addPhoneNumber = async (userId: string, phoneData: PhoneNumberData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/add/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(phoneData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add phone number');
    }
    
    return data;
  } catch (error) {
    console.error('Add phone error:', error);
    if (error instanceof Error) {
      toast({
        title: "Failed to Add Phone",
        description: error.message,
        variant: "destructive",
      });
    }
    throw error;
  }
};

export const addUsername = async (userId: string, usernameData: UsernameData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/addUsername/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usernameData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add username');
    }
    
    return data;
  } catch (error) {
    console.error('Add username error:', error);
    if (error instanceof Error) {
      toast({
        title: "Failed to Add Username",
        description: error.message,
        variant: "destructive",
      });
    }
    throw error;
  }
};
