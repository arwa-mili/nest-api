import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, OneToOne, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { Schedule } from "./Schedule.entity";
import { Measure } from "./measure.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Time } from "./time.entity";

@Entity()
export class MeasureSchedule {

    @PrimaryGeneratedColumn()
    id: number;


    // Store hours in format "HH:MM:SS" 
    //(e.g., "14:00:00" for 2 PM)


    @OneToMany(() => Time, (Time) => Time.measure)
    hours?: Time[] | null;

    @Column({})
    specification: String


    @Column({ name: "schedule_id", default: null })
    scheduleid: number

    @Column({ name: "measure_id" })
    measureId: number



    @ManyToOne(() => Schedule, (Schedule) => Schedule.measuresToschedule)
    @JoinColumn({ name: "schedule_id" })
    schedule: Schedule;

    @ManyToOne(() => Measure, (Measure) => Measure.scheduled)
    @JoinColumn({ name: "measure_id" })
    measureschedule: Measure;









    generateCronExpressions(): string[] {
        return this.hours.map(hour => {
            const [hourStr, minuteStr, secondStr] = hour.toString().split(":");
            return `${secondStr} ${minuteStr} ${hourStr} * * *`;
        });
    }

}