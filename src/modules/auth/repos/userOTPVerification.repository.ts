import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { UserOTPVerification } from '../entities/userotpVerification.entity';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class UserOTPVerificationRepository extends Repository<UserOTPVerification> {
    constructor(
        private readonly datasource: DataSource,

    ) { super(UserOTPVerification, datasource.createEntityManager()) }

    async findLatestByEmail(email: string): Promise<UserOTPVerification> {
        const found = await this.datasource.getRepository(UserOTPVerification).createQueryBuilder('userOTPVerification')
            .where('userOTPVerification.email = :email', { email })
            .orderBy({ 'userOTPVerification.createdAt': 'DESC' })
            .getOne();
        

        if (!found) {
            throw new NotFoundException(`${email} not found`);
        }
        return found;


    }
}
