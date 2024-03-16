import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { UserCodeVerification } from '../entities/user-code-verification.entity';



@Injectable()
export class UserOTPVerificationRepository extends Repository<UserCodeVerification> {
    constructor(
        private readonly datasource: DataSource,

    ) { super(UserCodeVerification, datasource.createEntityManager()) }

    async findLatestByEmail(email: string): Promise<UserCodeVerification> {
        const found = await this.datasource.getRepository(UserCodeVerification).createQueryBuilder('userCodeVerification')
            .where('userCodeVerification.email = :email', { email })
            .orderBy({ 'userCodeVerification.createdAt': 'DESC' })
            .getOne();


        if (!found) {
            throw new NotFoundException(`${email} not found`);
        }
        return found;


    }

    async findAllOldByEmailAndDelete(email: string): Promise<void> {

        const emailVerif = await this.datasource.getRepository(UserCodeVerification).createQueryBuilder('userCodeVerification')
            .where('userCodeVerification.email = :email', { email })
            .orderBy({ 'userCodeVerification.createdAt': 'DESC' })
            .getMany();

       
       if (emailVerif && emailVerif.length > 0) {
      
        await Promise.all(emailVerif.map(async (verification) => {
            await this.datasource.getRepository(UserCodeVerification).remove(verification);
        }));
    }

    }




}
