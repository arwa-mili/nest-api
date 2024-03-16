import { Body, HttpException, Inject, Injectable, Res, forwardRef } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

import { HttpStatus } from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from 'src/modules/users/entities/user.entity';
import { EmailSendingService } from 'src/shared/modules/email-sender-module/service/email-sending.service';
import { emailsenddto } from 'src/shared/modules/email-sender-module/dto/email-send.dto';
import { UserRepository } from 'src/modules/users/repository/users.repository';
import { UserOTPVerificationRepository } from '../repos/user-code-verification.repository';

@Injectable()
export class EmailVerificationService {
    constructor(

        @Inject(forwardRef(() => AuthService))
        private authService: AuthService,

        private emailService: EmailSendingService,


        private userOTPVerificationRepository: UserOTPVerificationRepository,

        private userRepository: UserRepository,
    ) { }


    async resendVerifEmail(email: string): Promise<void> {
        const userOTPVerificationRecord = await this.userOTPVerificationRepository.findLatestByEmail(email);



        try {
            await this.userOTPVerificationRepository.findAllOldByEmailAndDelete(email)
            const code = `${Math.floor(1000 + Math.random() * 9000)}`;

            const subject = 'Verify your email'
            const body = `<p>Enter <b>${code}</b> in the app to verify your email address and complete the registration. This OTP will expire in 1 hour</p>`

            const senderEmail = process.env.AUTH_EMAIL


            const saltRounds = 10;
            const hashedOTP = await bcrypt.hash(<string>(code), saltRounds);
            const emaildto : emailsenddto={
                senderemail:senderEmail,
                receiveremail:email,
                body:body,
                subject:subject

            }

            await this.emailService.SendEmail(emaildto)
            const newOTPVerification = this.userOTPVerificationRepository.create({
                email: email,
                otp: hashedOTP,
                phoneNumber: userOTPVerificationRecord.phoneNumber,
                password: userOTPVerificationRecord.password,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 3600000),
            });

            this.userOTPVerificationRepository.save(newOTPVerification);



        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.SERVICE_UNAVAILABLE);


        }

    }


    async sendVerificationEmail(user: User): Promise<void> {


        try {
            const code = `${Math.floor(1000 + Math.random() * 9000)}`;
            const body = `<p>Enter <b>${code}</b> in the app to verify your email address and complete the registration. This OTP will expire in 1 hour</p>`

            const subject = 'Verify your email';

            const saltRounds = 10;
            const hashedOTP = await bcrypt.hash(<string>(code), saltRounds);
            const senderEmail = process.env.AUTH_EMAIL

            const emaildto : emailsenddto={
                senderemail:senderEmail,
                receiveremail:user.email,
                body:body,
                subject:subject

            }

            await this.emailService.SendEmail(emaildto)
            const newOTPVerification = this.userOTPVerificationRepository.create({
                email: user.email,
                otp: hashedOTP,
                phoneNumber: user.phoneNumber,
                password: user.password,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 3600000),
            });

            this.userOTPVerificationRepository.save(newOTPVerification);



        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.SERVICE_UNAVAILABLE);
        }

    }

    async verifyCode(email: string, otp: string): Promise<any> {
        try {
            if (!email || !otp) {
                throw { message: 'Empty OTP details are not allowed', statusCode: HttpStatus.BAD_REQUEST };
            } else {
                const userOTPVerificationRecord = await this.userOTPVerificationRepository.findLatestByEmail(email);

                if (!userOTPVerificationRecord) {
                    throw { message: 'Your account is verified login to pass', statusCode: HttpStatus.UNAUTHORIZED };
                } else {
                    const { expiresAt, otp: hashedOTP, password } = userOTPVerificationRecord;

                    if (expiresAt <= new Date()) {
                        await this.userOTPVerificationRepository.delete(userOTPVerificationRecord);
                        throw { message: 'Code has expired. Please request again.', statusCode: HttpStatus.BAD_REQUEST };
                    } else {
                        const validOTP = await bcrypt.compare(otp, hashedOTP);

                        if (!validOTP) {
                            throw { message: 'Invalid code passed. Check your inbox.', statusCode: HttpStatus.UNAUTHORIZED };
                        } else {
                            const hashedPassword = await bcrypt.hash(password, 10);

                            const u: Partial<User> = {
                                email: userOTPVerificationRecord.email,
                                phoneNumber: userOTPVerificationRecord.phoneNumber,
                                password: hashedPassword,
                            };

                            const payload = { username: u.name, sub: u.id };
                            const backendTokens = await this.authService.getTokens(payload);

                            const user = await this.userRepository.createAndSave(u);
                            await this.userOTPVerificationRepository.delete(userOTPVerificationRecord);

                            return { user, backendTokens };
                        }
                    }
                }
            }
        } catch (error) {
            if (error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

}
