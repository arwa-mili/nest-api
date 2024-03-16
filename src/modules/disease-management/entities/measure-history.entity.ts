import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Schedule } from "./schedule.entity";
import { Measure } from "./measure.entity";
import { User } from "src/modules/users/entities/user.entity";
import { MeasureSchedule } from "./measure-schedule.entity";

@Entity("measure_history")
export class MeasureHistory {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({ name: "user_id" })
    userid: number


    @ManyToOne(() => User, (User) => User.measures)
    @JoinColumn({ name: "user_id" })
    user: User


    @Column({ name: "measure_schedule_id", nullable: true })
    measureschedule_id: number




    @Column({ name: "measure_name", nullable: true })
    measurename: string

    @ManyToOne(() => MeasureSchedule, (MeasureSchedule) => MeasureSchedule.history)
    @JoinColumn({ name: "measure_schedule_id" })
    measurescheduleid:number


    @ManyToOne(() => Measure, (Measure) => Measure.history)
    @JoinColumn({ name: "measure_name" })
    measure: Measure

    @Column({ type: 'float' })
    value: number


    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;







}