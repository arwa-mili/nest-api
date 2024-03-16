import { User } from "src/modules/users/entities/user.entity";

export class AuthResponse {
    user: User | any;
    backendTokens: {
        accessToken: string;
        refreshToken: string;
    };
}