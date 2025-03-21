
// Transaction request types
export interface DepositRequest {
  email: string;
  amount: number;
}

export interface WithdrawRequest {
  account_bank: string;
  account_number: string;
  amount: number;
  narration: string;
  currency: string;
  reference: string;
  debit_currency: string;
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

// Transaction response types
export interface Transaction {
  _id: string;
  transactionType: string;
  amount: {
    $numberDecimal: string;
  };
  description: string;
  createdAt: string;
}

export interface TransactionsResponse {
  status: string;
  message: string;
  data: {
    transactions: Transaction[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}
