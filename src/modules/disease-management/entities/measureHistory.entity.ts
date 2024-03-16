import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Schedule } from "./Schedule.entity";
import { Measure } from "./measure.entity";
import { User } from "src/modules/users/entities/user.entity";

@Entity()
export class MeasureHistory {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({ name: "user_id" })
    userid: number


    @ManyToOne(() => User, (User) => User.measures)
    @JoinColumn({ name: "user_id" })
    user: User


    @Column()
    date: Date


    @Column({ name: "measure_id" })
    measureid: number


    @ManyToOne(() => Measure, (Measure) => Measure.history)
    @JoinColumn({ name: "measure_id" })
    measure: Measure

    @Column()
    value: Number

    //feedback ?





}