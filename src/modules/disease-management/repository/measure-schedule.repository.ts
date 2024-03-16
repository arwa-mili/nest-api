import { Injectable } from "@nestjs/common";
import { MeasureSchedule } from "../entities/measure-schedule.entity";
import { IMeasureScheduleRepository } from "../interfaces/IMeasureSchedule-repository.interface";
import { DataSource, DeepPartial, Repository } from "typeorm";
import { AddMeasureScheduleDto } from "../dto/Add-measure-schedule.dto";





@Injectable()
export class MeasureScheduleRepository extends Repository<MeasureSchedule> implements IMeasureScheduleRepository {



    constructor(
        private readonly datasource: DataSource
    ) { super(MeasureSchedule, datasource.createEntityManager()) }





    async createAndSave(measureScheduleData: AddMeasureScheduleDto): Promise<MeasureSchedule[]> {
        const entityManager = this.datasource.createEntityManager();
        const measureSchedules: MeasureSchedule[] = [];
        
        for (let isoWeekdayValue = 1; isoWeekdayValue <= 7; isoWeekdayValue++) {
            const mappedData: DeepPartial<MeasureSchedule> = {
                time: measureScheduleData.time,
                specification: measureScheduleData.specification,
                measureId: measureScheduleData.measureId,
                limitInf:measureScheduleData.limitInf,
                limitSup:measureScheduleData.limitSup,
                iSOweekday: isoWeekdayValue,
            };

            const newMeasureSchedule = entityManager.create(MeasureSchedule, mappedData);
            await entityManager.save(newMeasureSchedule);
            measureSchedules.push(newMeasureSchedule);
        }

        return measureSchedules;
    }


    async findByMeasureIdsAndTime(mesId, time): Promise<MeasureSchedule[]> {

     
            const measures = await this.createQueryBuilder('measureSch')
                .where('measureSch.measureId = :mesId', { mesId })
                .andWhere('measureSch.time = :time', { time })
                .getMany();
            console.log(measures);
            return measures;
       


    }



}
