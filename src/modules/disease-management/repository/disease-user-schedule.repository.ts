import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Schedule } from "../entities/schedule.entity";
import { DiseaseUserSchedule } from "../entities/disease-user-schedule.entity";
import { DiseaseUserScheduleDto } from "../dto/disease-user-schedule.dto";
import { plainToClass } from 'class-transformer';

@Injectable()
export class DiseaseUserScheduleRepository extends Repository<DiseaseUserSchedule>  {


    constructor(
        private readonly datasource: DataSource
    ) { super(Schedule, datasource.createEntityManager()) }


    async createAndSave(data: DiseaseUserScheduleDto): Promise<DiseaseUserSchedule> {
        const entityManager = this.datasource.createEntityManager();

        const plainData = plainToClass(DiseaseUserSchedule, data);

        const newEntity = entityManager.create(DiseaseUserSchedule, plainData);
        await entityManager.save(newEntity);

        return newEntity;
    }
    




    }