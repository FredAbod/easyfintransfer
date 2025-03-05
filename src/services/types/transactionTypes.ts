
// Transaction request types
export interface DepositRequest {
  email: string;
  amount: number;
}

// Profile response type
export interface ProfileResponse {
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
      accountNumber?: string;
    };
  };
}
