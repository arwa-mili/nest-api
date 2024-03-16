import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";


import { MeasureSchedule } from "./measure-schedule.entity";
import { Disease } from "./disease.entity";
import { DiseaseUserSchedule } from "./disease-user-schedule.entity";


// the schedule of measures to measure related to one disease ;
//one disease can have many schedules that vary based on patient's infos and condition
@Entity('schedule')
export class Schedule {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, default: "default" })
    title: string;

    @Column({default:"no spec"})
    specification: string

    @ManyToOne(() => Disease, (Disease) => Disease.schedules)
    @JoinColumn()
    disease: Disease;


    @OneToMany(() => MeasureSchedule, (MeasureSchedule) => MeasureSchedule.schedule)
    measuresToschedule: MeasureSchedule[];
  

/*
    @OneToMany(() => DiseaseUserSchedule,(DiseaseUserSchedule) => DiseaseUserSchedule.schedule )
    diseaseUserSchedules: DiseaseUserSchedule[];
*/
    addMeasureSchedule(measureToSchedule: MeasureSchedule) {
        if (this.measuresToschedule == null) {
            this.measuresToschedule = new Array<MeasureSchedule>();
        }
        this.measuresToschedule.push(measureToSchedule);
    }
}