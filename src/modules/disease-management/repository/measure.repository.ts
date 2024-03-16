import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { IMeasureRepository } from "../interfaces/IMeasure-repository.interface";
import { AddMeasureDto } from "../dto/add-measure.dto";
import { Measure } from "../entities/measure.entity";
import { Disease } from "../entities/disease.entity";


@Injectable()
//export class MeasureRepository extends (Repository<Disease>,Repository<Measure>) implements IMeasureRepository {
export class MeasureRepository extends Repository<Measure> implements IMeasureRepository {


    constructor(
        private readonly datasource: DataSource
    ) { super(Measure, datasource.createEntityManager()) }


    /*
        createAndSave(measureData: AddMeasureDto): Promise<Measure> {
            const newMeasure = this.create(measureData);
    
            return this.save(newMeasure);
        }
    */

    async createAndSave(measureData: AddMeasureDto): Promise<Measure> {
        const entityManager = this.datasource.createEntityManager();



        const newMeasure = entityManager.create(Measure, measureData);
        await entityManager.save(newMeasure);
        return newMeasure;

    }

}