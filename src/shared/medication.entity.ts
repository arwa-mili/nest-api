import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Unit } from "./enums/unit";
import { MedicationType } from "./enums/medicationType";

@Entity()
export class Medication {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    avatar: string;

    @Column()
    type: MedicationType;

    @Column("simple-array")
    units: Unit[];

}
