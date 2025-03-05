
import { apiClient, handleApiError } from './apiUtils';
import { 
  SignupRequest, 
  SigninRequest, 
  AddPhoneRequest, 
  AddUsernameRequest, 
  AuthResponse 
} from './types/authTypes';

// Core auth API functions
export const authApi = {
  // Signup user
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    try {
      console.log("Calling signup API with:", data);
      const response = await apiClient.post<AuthResponse>('/api/v1/user/signup', data);
      console.log("Signup API response:", response.data);
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Signup failed');
    }
  },

  // Sign in user
  signin: async (data: SigninRequest): Promise<AuthResponse> => {
    try {
      console.log("Calling signin API with:", data);
      const response = await apiClient.post<AuthResponse>('/api/v1/user/signIn', data);
      console.log("Signin API response:", response.data);
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Signin failed');
    }
  },

  // Add phone number
  addPhoneNumber: async (userId: string, data: AddPhoneRequest): Promise<AuthResponse> => {
    try {
      console.log(`Calling API: PUT /api/v1/user/add/${userId}`, data);
      const response = await apiClient.put<AuthResponse>(`/api/v1/user/add/${userId}`, data);
      console.log("Phone Number API response:", response.data);
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Failed to add phone number');
    }
  },

  // Add username
  addUsername: async (userId: string, data: AddUsernameRequest): Promise<AuthResponse> => {
    try {
      console.log(`Calling API: PUT /api/v1/user/addUsername/${userId}`, data);
      const response = await apiClient.put<AuthResponse>(`/api/v1/user/addUsername/${userId}`, data);
      console.log("Username API response:", response.data);
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Failed to add username');
    }
  }
};

// Compatibility layers for unused components
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
        user: {
          _id: response.data.user._id,
          email: response.data.user.email,
          username: response.data.user.userName,
          phoneNumber: response.data.user.phoneNumber,
        },
        // Add these properties at the top level for UsernameForm
        email: response.data.user.email,
        phoneNumber: response.data.user.phoneNumber
      };
    }
    return response;
  } catch (error) {
    throw error;
  }
};
