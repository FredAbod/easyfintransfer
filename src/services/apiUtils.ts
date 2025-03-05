
import axios from 'axios';

export const API_BASE_URL = 'https://miniopay.onrender.com';

// Create a base axios instance with common configuration
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Common error handler for API requests
export const handleApiError = (error: any, defaultMessage: string = 'Network error occurred') => {
  console.error("API error:", error.response?.data || error.message);
  if (error.response) {
    return error.response.data;
  }
  throw new Error(defaultMessage);
};
