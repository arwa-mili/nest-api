interface EmailVerificationResult {
    status: string;
    message: string;
    data?: {
      email: string;
    };
  }