import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserOtpVerification')
export class UserOTPVerification {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    email: string;

    @Column()
    phoneNumber: Number;

    @Column()
    password: string;

    @Column()
    otp: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    expiresAt: Date;
}
