import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, OneToOne, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { Schedule } from "./schedule.entity";
import { Measure } from "./measure.entity";
import { Weekday } from "../enums/weekday.enum";
import { IsOptional } from "class-validator";
import { MeasureHistory } from "./measure-history.entity";

@Entity("measure_schedule")
export class MeasureSchedule {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({})
    specification: String;


    @Column('time')
    time: string

/*
    @Column()
    isDaily:boolean
*/
    @Column({ type: 'enum', enum: Weekday })
    iSOweekday: Weekday


    @Column({ name: "schedule_id", default: null })
    scheduleid: number

    @Column({ name: "measure_id" })
    measureId: number


 
    @Column({default: null })
    limitInf?: number;
    


    @Column({default: null })
    limitSup?: number;


   
    @Column({default: null })
    marge?: number;



    @ManyToOne(() => Schedule, (Schedule) => Schedule.measuresToschedule)
    @JoinColumn({ name: "schedule_id" })
    schedule: Schedule;

    @ManyToOne(() => Measure, (Measure) => Measure.scheduled)
    @JoinColumn({ name: "measure_id" })
    measureschedule: Measure;


    @OneToMany(() => MeasureHistory, (MeasureHistory) => MeasureHistory.measurescheduleid)
    history: MeasureHistory[];











}