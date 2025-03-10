
import { apiClient, handleApiError } from './apiUtils';
import { DepositRequest } from './types/transactionTypes';
import { AuthResponse } from './types/authTypes';

// Deposit funds
export const depositFunds = async (data: DepositRequest): Promise<AuthResponse> => {
  try {
    console.log(`Calling Deposit API with:`, data);
    const response = await apiClient.post<AuthResponse>('/api/v1/user/deposit', data);
    console.log("Deposit API response:", response.data);
    return response.data;
  } catch (error: any) {
    return handleApiError(error, 'Deposit failed');
  }
};

// Withdraw funds
export const withdrawFunds = async (data: any): Promise<AuthResponse> => {
  try {
    console.log(`Calling Withdraw API with:`, data);
    const response = await apiClient.post<AuthResponse>('/api/v1/user/withdraw', data);
    console.log("Withdraw API response:", response.data);
    return response.data;
  } catch (error: any) {
    return handleApiError(error, 'Withdrawal failed');
  }
};
