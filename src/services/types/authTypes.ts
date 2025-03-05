
// Auth request and response types
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
  // Additional properties needed for UsernameForm component
  email?: string;
  phoneNumber?: string;
}
