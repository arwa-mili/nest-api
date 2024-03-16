import { User } from "src/modules/users/entities/user.entity";

export class AuthResponse {
    userrr: User | any;
    backendTokens: {
        accessToken: string;
        refreshToken: string;
    };
}