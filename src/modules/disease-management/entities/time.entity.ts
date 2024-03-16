import { Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany, ManyToOne, ManyToMany, JoinColumn } from "typeorm";


import { Disease } from "./disease.entity";
import { MeasureSchedule } from "./MeasureSchedule.entity";

@Entity()
export class Time {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    time:string
    
    @ManyToOne(() => MeasureSchedule, (MeasureSchedule) => MeasureSchedule.hours)
    measure: MeasureSchedule[];

    
}