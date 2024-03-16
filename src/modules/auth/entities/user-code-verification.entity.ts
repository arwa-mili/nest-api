import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_code_verification')
export class UserCodeVerification {
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

    @Column({ type: 'timestamp' })
    expiresAt: Date;
}
