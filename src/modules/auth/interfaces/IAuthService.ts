import { User } from "src/modules/users/entities/user.entity";
import { AuthResponse } from "../dto/authResponse.dto";
import { SignUpDto } from "../dto/signup.dto";
import { Payload } from "../entities/payload";

export interface IAuthService {
    resetPassword(email: string, resetPassword: string): Promise<any>;
    sendResetPasswordEmail(email: string): Promise<void>;
    logout(userId: number): Promise<void>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<Partial<User>>;
    refreshTokens(userId: number, refreshToken: string): Promise<any>;
    getTokens(payload: Payload): Promise<{ accessToken: string, refreshToken: string }>;
    signUp(signUpDto: SignUpDto): Promise<any>;
    loginWithEmail(email: string, password: string): Promise<AuthResponse>;
    loginWithPhoneNumber(phoneNumber: number, password: string): Promise<AuthResponse>;
}
