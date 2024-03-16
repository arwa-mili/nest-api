import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { MedicationType } from "../enums/medication-type.enum";
import { Unit } from "../enums/unit.enum";


@Entity('medication')
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
