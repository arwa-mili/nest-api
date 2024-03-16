import { User } from "../entities/user.entity";
export const USERTOKEN = "fndjhfbnhdfnfh";
export interface IUserRepository {
    findByEmail(email: string): Promise<User | undefined>;
    findByPhoneNumber(phoneNumber: number): Promise<User | undefined>;
    createAndSave(userData: Partial<User>): Promise<User>;
    findById(id: number): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    findByIdAndDelete(id: Number): Promise<User>;

}