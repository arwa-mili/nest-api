
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, Timestamp, OneToMany } from "typeorm";


import { Unit } from "src/shared/enums/unit.enum";

import { IsOptional } from "class-validator";
import { MeasureType } from "../enums/measure-type.enum";
import { MeasureHistory } from "./measure-history.entity";
import { MeasureSchedule } from "./measure-schedule.entity";

@Entity('measure')
export class Measure {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true , name: "measure_name" })
    name: string;

    @Column({ type: "enum", enum: Unit })
    unit: Unit;
    @Column({
        type: 'enum',
        enum: MeasureType,
        nullable: true,
    })
    measureType: MeasureType

    @OneToMany(() => MeasureSchedule, (MeasureSchedule) => MeasureSchedule.measureschedule)
    @JoinTable()
    scheduled?: MeasureSchedule[];

    @IsOptional()
    @Column()
    limitInf?: number;
    
    

    @IsOptional()
    @Column()
    limitSup?: number;


    @IsOptional()
    @Column()
    marge?: Number;

    @OneToMany(() => MeasureHistory, (MeasureHistory) => MeasureHistory.measure)
    history: MeasureHistory[];

}