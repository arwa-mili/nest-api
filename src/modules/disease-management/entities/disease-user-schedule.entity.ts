import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Disease } from "./disease.entity";
import { Schedule } from "./schedule.entity";
import { User } from "src/modules/users/entities/user.entity";
import "reflect-metadata";

@Entity("disease_user_schedule")
export class DiseaseUserSchedule {
    @Column({ name :"sched", default: null })
    sched: Number;

    @PrimaryColumn({ name: "user_id", default:0 })
    user_id: Number;

    @PrimaryColumn({ name: "disease_id",default:0 })
    disease_id: Number;

/*
    @ManyToOne(() => Schedule, schedule => schedule.diseaseUserSchedules)
    @JoinColumn({ name: "schedule_id" })
    schedule: Schedule;
*/
    @ManyToOne(() => User, user => user.diseaseUserSchedules)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Disease, disease => disease.diseaseUserSchedules)
    @JoinColumn({ name: "disease_id" })
    disease: Disease;

    
    
}

