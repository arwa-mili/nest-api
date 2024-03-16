import { DiseaseUserSchedule } from 'src/modules/disease-management/entities/disease-user-schedule.entity';
import { Disease } from 'src/modules/disease-management/entities/disease.entity';
import { MeasureHistory } from 'src/modules/disease-management/entities/measure-history.entity';
import { Schedule } from 'src/modules/disease-management/entities/schedule.entity';
import { Person } from 'src/shared/entities/person.entity';
import { Entity, Column, PrimaryGeneratedColumn, IsNull, OneToMany, ManyToMany, OneToOne, JoinColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';




@Entity('medical-file')
export class MedicalFile {



    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;


    @ManyToOne(() => User, (User) => User.medicalfiles)
    @JoinColumn()
    user: User;




}