import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { IUserRepository } from "../interfaces/IUser-repository.interface";
import { User } from "../entities/user.entity";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserRepository extends Repository<User> implements IUserRepository {
    constructor(
        private readonly datasource: DataSource
    ) { super(User, datasource.createEntityManager()) }
    async findByIdAndDelete(id: Number): Promise<User> {
        const user = await this.findOneBy({ id });
        return this.remove(user);
    }

    async findByEmailAndUpdate(email: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
        const user = await this.findByEmail(email);
        Object.assign(user, updateUserDto);
        await this.save(user);

        return user;


    }
    async findOneByEmailOrPhoneNumber(email: string, phoneNumber: number): Promise<User> {
        const user = await this.createQueryBuilder('user')
            .where('user.email = :email OR user.phoneNumber = :phoneNumber', { email, phoneNumber })
            .getOne();

        return user;
    }
    async findByEmail(email: string): Promise<User> {

        const user = await this.findOneBy({ email });
        return user;
    }
    async findByPhoneNumber(phoneNumber: Number): Promise<User | undefined> {
        return this.findOneBy({ phoneNumber });
    }
    async createAndSave(userData: Partial<User>): Promise<User> {
        const newUser = await super.create(userData);
        return await super.save(newUser);
    }
    async findById(id: Number): Promise<User | undefined> {
        const user = await this.findOneBy({ id });
        return user;
    }
    async findAll(): Promise<User[]> {
        return await this.find();
    }


    async findByIdAndUpdate(id: Number, updateUserDto: UpdateUserDto): Promise<User> {
        const curruser = await this.findById(id);
        Object.assign(curruser, updateUserDto);






        return await this.save(curruser);
    }
}