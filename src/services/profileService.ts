
import { apiClient, handleApiError } from './apiUtils';
import { ProfileResponse } from './types/transactionTypes';

export const profileApi = {
  // Get user profile data
  getUserProfile: async (userId: string): Promise<ProfileResponse> => {
    try {
      console.log(`Fetching user profile for user ID: ${userId}`);
      const response = await apiClient.get<ProfileResponse>(`/api/v1/user/profile/${userId}`);
      console.log("Profile API response:", response.data);
      return response.data;
    } catch (error: any) {
      return handleApiError(error, 'Failed to retrieve user profile');
    }
  }
};
