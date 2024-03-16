import { Body, HttpException, Inject, Injectable, Res, forwardRef } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcryptjs';

import { HttpStatus } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserOTPVerificationRepository } from '../repos/userOTPVerification.repository';
import { UserRepository } from 'src/modules/users/repository/users.repository';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class EmailVerificationService {
    constructor(

        @Inject(forwardRef(() => AuthService))
        private authService: AuthService,


        private userOTPVerificationRepository: UserOTPVerificationRepository,

        private userRepository: UserRepository,
    ) { }


    async resendVerifEmail(email:string):Promise<EmailVerificationResult>{
        const userOTPVerificationRecord = await this.userOTPVerificationRepository.findLatestByEmail(email);

            const transporter = nodemailer.createTransport({

                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.AUTH_EMAIL,
                    pass: process.env.AUTH_PASS,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
    
            try {
                const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    
                const mailOptions = {
    
                    from: process.env.AUTH_EMAIL,
                    to: email,
                    subject: 'Verify your email',
                    html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the registration. This OTP will expire in 1 hour</p>`,
                };
    
                const saltRounds = 10;
                const hashedOTP = await bcrypt.hash(<string>(otp), saltRounds);
    
                const newOTPVerification = this.userOTPVerificationRepository.create({
                    email: email,
                    otp: hashedOTP,
                    phoneNumber: userOTPVerificationRecord.phoneNumber,
                    password: userOTPVerificationRecord.password,
                    createdAt: new Date(),
                    expiresAt: new Date(Date.now() + 3600),
                });
    
                this.userOTPVerificationRepository.save(newOTPVerification);
                await transporter.sendMail(mailOptions);
    
                return {
                    status: 'PENDING',
                    message: 'Verification OTP email sent',
                    data: {
                        email: email,
                    }
                };
            } catch (error) {
                return {
    
                    status: 'REJECTED',
                    message: 'Email invalid',
    
    
                }
            }
        }
    

    async sendOTPVerificationEmail(user: User): Promise<EmailVerificationResult> {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        try {
            const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

            const mailOptions = {

                from: process.env.AUTH_EMAIL,
                to: user.email,
                subject: 'Verify your email',
                html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the registration. This OTP will expire in 1 hour</p>`,
            };

            const saltRounds = 10;
            const hashedOTP = await bcrypt.hash(<string>(otp), saltRounds);

            const newOTPVerification = this.userOTPVerificationRepository.create({
                email: user.email,
                otp: hashedOTP,
                phoneNumber: user.phoneNumber,
                password: user.password,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 360000000),
            });

            this.userOTPVerificationRepository.save(newOTPVerification);
            await transporter.sendMail(mailOptions);

            return {
                status: 'PENDING',
                message: 'Verification OTP email sent',
                data: {
                    email: user.email,
                }
            };
        } catch (error) {
            return {

                status: 'REJECTED',
                message: 'Email invalid',


            }
        }
    }

    async verifyOTP(email: string, otp: string): Promise<any> {
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
                                verified: true,
                            };
    
                            const payload = { username: u.name, sub: u.id };
                            const backendTokens = await this.authService.getTokens(payload);
                            
                            const uu = await this.userRepository.createAndSave(u);
                            const userr = await this.authService.updateRefreshToken(uu.id, backendTokens.refreshToken);
                            await this.userOTPVerificationRepository.delete(userOTPVerificationRecord);
                            
                            return { userr, backendTokens };
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
