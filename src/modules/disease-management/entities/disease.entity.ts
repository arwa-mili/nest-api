import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm'


import { User } from 'src/modules/users/entities/user.entity';
import { Schedule } from './schedule.entity';
import { DiseaseUserSchedule } from './disease-user-schedule.entity';

@Entity('disease')
export class Disease {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;






    @OneToMany(() => Schedule, (Schedule) => Schedule.disease)
    schedules: Schedule[];


    @ManyToMany(() => User, (User) => User.diseases)
    @JoinTable()
    usersaffected: User[];

    @OneToMany(() => DiseaseUserSchedule, (DiseaseUserSchedule) => DiseaseUserSchedule.disease_id)
    diseaseUserSchedules: DiseaseUserSchedule[];

    addSchedule(schedule: Schedule) {
        if (this.schedules == null) {
            this.schedules = new Array<Schedule>();
        }
        this.schedules.push(schedule);
    }

    addUserAffected(user: User) {
        if (this.usersaffected == null) {
            this.usersaffected = new Array<User>();
        }
        this.usersaffected.push(user);
    }













}

