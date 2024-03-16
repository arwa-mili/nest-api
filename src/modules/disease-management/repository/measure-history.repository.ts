import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { IDiseaseRepository } from "../interfaces/IDisease-repository.interface";
import { addDiseaseDto } from "../dto/add-disease.dto";
import { Disease } from "../entities/disease.entity";
import { MeasureHistory } from "../entities/measure-history.entity";
import { IMeasureHistoryRepository } from "../interfaces/IMeasure-history-repository.interface";
import { measurehistorydto } from "../dto/add-measure-history.dto";
import { User } from "src/modules/users/entities/user.entity";
import { Measure } from "../entities/measure.entity";


@Injectable()
export class MeasureHistoryRepository extends Repository<MeasureHistory> implements IMeasureHistoryRepository {


    constructor(
        private readonly datasource: DataSource
    ) { super(MeasureHistory, datasource.createEntityManager()) }





    async createAndSave(user: User, measure: Measure, meshistorydto: measurehistorydto): Promise<MeasureHistory> {

        const measurehistory = await this.create(meshistorydto)
        measurehistory.user = user;
        measurehistory.measure = measure;
        return await this.save(measurehistory)

    }





}