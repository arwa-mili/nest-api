import { Role } from 'src/modules/auth/enums/role';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('person')
export class Person {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column({ unique: true })
    phoneNumber: Number;

    @Column({ unique: true })
    email: string;

    @Column({ nullable:true })
    avatar: string;




    @Column({ type: "enum", enum: Role })

    role: Role




}
