import axios from 'axios';

const API_BASE_URL = 'https://miniopay.onrender.com';

// Types
export interface SignupRequest {
  email: string;
  password: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface AddPhoneRequest {
  phoneNumber: string;
}

export interface AddUsernameRequest {
  userName: string;
}

// Updated to match actual API response structure
export interface AuthResponse {
  status: string;
  message: string;
  data?: {
    user: {
      _id: string;
      email: string;
      userName?: string;
      phoneNumber?: string;
      accountBalance?: {
        $numberDecimal: string;
      };
      createdAt: string;
      updatedAt: string;
    };
    token?: string;
  };
  token?: string; // Some endpoints might return token at the top level
}

// API service functions
export const authApi = {
  // Signup user
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    try {
      console.log("Calling signup API with:", data);
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/api/v1/user/signup`, data);
      console.log("Signup API response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Signup API error:", error.response?.data || error.message);
      if (error.response) {
        return error.response.data;
      }
      throw new Error('Network error occurred');
    }
  },

  // Sign in user
  signin: async (data: SigninRequest): Promise<AuthResponse> => {
    try {
      console.log("Calling signin API with:", data);
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/api/v1/user/signIn`, data);
      console.log("Signin API response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Signin API error:", error.response?.data || error.message);
      if (error.response) {
        return error.response.data;
      }
      throw new Error('Network error occurred');
    }
  },

  // Add phone number
  addPhoneNumber: async (userId: string, data: AddPhoneRequest): Promise<AuthResponse> => {
    try {
      console.log(`Calling API: PUT ${API_BASE_URL}/api/v1/user/add/${userId}`, data);
      const response = await axios.put<AuthResponse>(`${API_BASE_URL}/api/v1/user/add/${userId}`, data);
      console.log("Phone Number API response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("API error:", error.response?.data || error.message);
      if (error.response) {
        return error.response.data;
      }
      throw new Error('Network error occurred');
    }
  },

  // Add username
  addUsername: async (userId: string, data: AddUsernameRequest): Promise<AuthResponse> => {
    try {
      console.log(`Calling API: PUT ${API_BASE_URL}/api/v1/user/addUsername/${userId}`, data);
      const response = await axios.put<AuthResponse>(`${API_BASE_URL}/api/v1/user/addUsername/${userId}`, data);
      console.log("Username API response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("API error:", error.response?.data || error.message);
      if (error.response) {
        return error.response.data;
      }
      throw new Error('Network error occurred');
    }
  }
};
