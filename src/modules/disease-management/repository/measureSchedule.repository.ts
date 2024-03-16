import { Injectable } from "@nestjs/common";
import { MeasureSchedule } from "../entities/MeasureSchedule.entity";
import { IMeasureScheduleRepository } from "../interfaces/IMeasureScheduleRepository";
import { DataSource, Repository } from "typeorm";
import { AddMeasureScheduleDto } from "../dto/AddMeasureScheduleDto";





@Injectable()
export class MeasureScheduleRepository extends Repository<MeasureSchedule> implements IMeasureScheduleRepository {



    constructor(
        private readonly datasource: DataSource
    ) { super(MeasureSchedule, datasource.createEntityManager()) }





    async createAndSave(measureScheduleData: AddMeasureScheduleDto): Promise<MeasureSchedule> {
        const entityManager = this.datasource.createEntityManager();
        /*
        const hoursArray: string[] = [];
        measureScheduleData.hours.forEach(hour => {
            hoursArray.push(hour);
        });

        measureScheduleData.hours = hoursArray;
*/
        const newMeasureSchedule = entityManager.create(MeasureSchedule, measureScheduleData);
        await entityManager.save(newMeasureSchedule);
        return newMeasureSchedule;

    }

}
