import { Entity, Column, PrimaryGeneratedColumn, IsNull } from 'typeorm';
import { Person } from './person.entity';



@Entity('Doctor')
export class Doctor extends Person {



    @Column({ nullable: true })

    name: string;

    @Column({ nullable: true })

    surname: string;

    @Column({ nullable: true })
    password: string;
}
