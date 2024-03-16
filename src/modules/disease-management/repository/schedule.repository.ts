import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { IDiseaseRepository } from "../interfaces/IDisease-repository.interface";
import { addDiseaseDto } from "../dto/add-disease.dto";
import { Disease } from "../entities/disease.entity";
import { Schedule } from "../entities/schedule.entity";
import { AddScheduleDto } from "../dto/add-schedule.dto";


@Injectable()
export class ScheduleRepository extends Repository<Schedule>  {


    constructor(
        private readonly datasource: DataSource
    ) { super(Schedule, datasource.createEntityManager()) }




    createAndSave(scheduleData: AddScheduleDto,disease:Disease): Promise<Schedule> {


        const newSchedule = this.create(scheduleData);
        newSchedule.measuresToschedule=[];
        newSchedule.disease=disease;
        return this.save(newSchedule);
    }

    async findAll(): Promise<Schedule[]> {
        return await this.findAll()
    }








}