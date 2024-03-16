import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from '../dto/signup.dto';
import { AuthResponse } from '../dto/auth-response.dto';
import { EmailVerificationService } from './email-verification.service';
import { User } from 'src/modules/users/entities/user.entity';
import { UserRepository } from 'src/modules/users/repository/users.repository';
import { UsersService } from 'src/modules/users/services/users.service';
import * as argon2 from 'argon2';
import { Payload } from '../entities/payload';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { randomBytes } from 'crypto';
import { IAuthService } from '../interfaces/IAuth-Service.interface';
import { removeDots } from 'src/shared/helper.functions';
import { EmailSendingService } from 'src/shared/modules/email-sender-module/service/email-sending.service';
import { emailsenddto } from 'src/shared/modules/email-sender-module/dto/email-send.dto';

@Injectable()
export class AuthService implements IAuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private emailVerif: EmailVerificationService,
        private usersService: UsersService,
        private emailService: EmailSendingService,

    ) { }

    async resetPassword(email: string, resetPassword: string) {
        const hashedPassword = await bcrypt.hash(resetPassword, 10);

        const dto: UpdateUserDto = {
            password: hashedPassword
        }
        const user = await this.usersService.findUserByEmailAndChangePassword(email, dto);
        return user;

    }


    async sendResetPasswordEmail(email: string) {


        try {
            const token = randomBytes(20).toString('hex');
            const resetLink = `myapp://reset-password/reset/${email}/?token=${token}`;
            const body = `<p>Go to this link <b><a href="${resetLink}">${resetLink}</a></b> in the app to reset you password.</p>`;
            const senderEmail = process.env.AUTH_EMAIL
            const subject = 'Reset your password'
            const emaildto : emailsenddto={
                senderemail:senderEmail,
                receiveremail:email,
                body:body,
                subject:subject

            }

            await this.emailService.SendEmail(emaildto)


        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.SERVICE_UNAVAILABLE);
        }

    }
    hashData(data: string) {
        return argon2.hash(data);
    }



    async refreshTokens(userId: Number) {
        const user = await this.usersService.findById(userId);

        const payload = { username: user.name, sub: user.id };
        if (!user)
            console.log("access denied")


        const tokens = await this.getTokens(payload);
        return tokens;
    }

    async getTokens(payload: Payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    payload
                },
                {
                    secret: process.env.JWT_ACCESS_SECRET,
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    payload
                },
                {
                    secret: process.env.JWT_REFRESH_SECRET,
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async signUp(signUpDto: SignUpDto): Promise<void> {
        const { email, phoneNumber, password, confirmPassword } = signUpDto;

        const cleanedEmail = removeDots(email);


        const userr = await this.userRepository.findOneBy({ email: cleanedEmail });

        if (userr) {
            throw new UnauthorizedException('Invalid credentials');

        }


        const user = this.userRepository.create({
            email: cleanedEmail,
            phoneNumber,
            password: password,
            role: 0,
            avatar: "25142",

        });





        return await this.emailVerif.sendVerificationEmail(user)






    }

    async loginWithEmail(email: string, password: string): Promise<AuthResponse> {

        const cleanedEmail = removeDots(email);

        const user = await this.userRepository.findOneBy({ email: cleanedEmail });

        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.name, sub: user.id };
        const backendTokens = await this.getTokens(payload)
        return Promise.resolve({ user, backendTokens });


    }

    async loginWithPhoneNumber(phoneNumber: Number, password: string): Promise<AuthResponse> {

        const user = await this.userRepository.findOneBy({ phoneNumber });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { username: user.name, sub: user.id };
        const backendTokens = await this.getTokens(payload)
        return { user, backendTokens };

    }




}
