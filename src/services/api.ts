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

export interface DepositRequest {
  email: string;
  amount: number;
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
  // For backwards compatibility with unused components
  user?: {
    _id: string;
    email: string;
    username?: string;
    phoneNumber?: string;
  };
  newUser?: {
    _id: string;
  };
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

// New deposit API service
export const depositFunds = async (data: DepositRequest): Promise<AuthResponse> => {
  try {
    console.log(`Calling Deposit API with:`, data);
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/api/v1/user/deposit`, data);
    console.log("Deposit API response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Deposit API error:", error.response?.data || error.message);
    if (error.response) {
      return error.response.data;
    }
    throw new Error('Network error occurred');
  }
};

// Export individual functions for the unused components to resolve build errors
export const loginUser = async (data: SigninRequest): Promise<AuthResponse> => {
  try {
    const response = await authApi.signin(data);
    // Map the response for compatibility with the unused LoginForm component
    if (response.status === 'success' && response.data?.user) {
      return {
        ...response,
        user: {
          _id: response.data.user._id,
          email: response.data.user.email,
          username: response.data.user.userName,
          phoneNumber: response.data.user.phoneNumber,
        }
      };
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const signupUser = async (data: SignupRequest): Promise<AuthResponse> => {
  try {
    const response = await authApi.signup(data);
    // Map the response for compatibility with the unused SignupForm component
    if (response.status === 'success' && response.data?.user) {
      return {
        ...response,
        newUser: {
          _id: response.data.user._id
        }
      };
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const addPhoneNumber = async (userId: string, data: AddPhoneRequest): Promise<AuthResponse> => {
  return authApi.addPhoneNumber(userId, data);
};

export const addUsername = async (userId: string, data: { username: string }): Promise<AuthResponse> => {
  // Convert userName to the correct property name for the API
  const apiData: AddUsernameRequest = {
    userName: data.username
  };
  
  try {
    const response = await authApi.addUsername(userId, apiData);
    // Map the response for compatibility with the unused UsernameForm component
    if (response.status === 'success' && response.data?.user) {
      return {
        ...response,
        email: response.data.user.email,
        phoneNumber: response.data.user.phoneNumber
      };
    }
    return response;
  } catch (error) {
    throw error;
  }
};
