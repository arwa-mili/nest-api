import { DiseaseUserSchedule } from 'src/modules/disease-management/entities/disease-user-schedule.entity';
import { Disease } from 'src/modules/disease-management/entities/disease.entity';
import { MeasureHistory } from 'src/modules/disease-management/entities/measure-history.entity';

import { Person } from 'src/shared/entities/person.entity';
import { Entity, Column, OneToMany, ManyToMany} from 'typeorm';
import { MedicalFile } from './medical-files.entity';




@Entity('user')
export class User extends Person {



    @Column({ nullable: true })

    name: string;

    @Column({ nullable: true })

    surname: string;

    @Column({
        nullable: true
    })
    gender: boolean;

    @Column({ type: 'date',nullable: true })
    birthdate: string;

    @Column({ type: 'float',nullable: true })
    height: number;

    @Column({ type: 'float',nullable: true })
    weight: number;

    @Column({ nullable: true })
    password: string;


    @ManyToMany(() => Disease, (Disease) => Disease.usersaffected)
    diseases: Disease[];
/*
    @OneToOne(() => Schedule)
    @JoinColumn()
    schedule: Schedule;
*/

    @OneToMany(() => DiseaseUserSchedule, (DiseaseUserSchedule) => DiseaseUserSchedule.user_id)
    diseaseUserSchedules: DiseaseUserSchedule[];




    @OneToMany(() => MeasureHistory, (MeasureHistory) => MeasureHistory.user)
    measures: MeasureHistory[];


    @OneToMany(() => MeasureHistory, (MeasureHistory) => MeasureHistory.user)
    medicalfiles: MedicalFile[];


    addmeasure(measure: MeasureHistory) {
        if (this.measures == null) {
            this.measures = new Array<MeasureHistory>();
        }
        this.measures.push(measure);
    }


}
