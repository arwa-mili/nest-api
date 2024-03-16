import { Injectable } from "@nestjs/common";


import { MeasureRepository } from "../repository/measure.repository";
import { Unit } from "src/shared/enums/unit.enum";
import { Measure } from "../entities/measure.entity";
import { MeasureType } from "../enums/measure-type.enum";
import { MeasureScheduleRepository } from "../repository/measure-schedule.repository";
import { MeasureSchedule } from "../entities/measure-schedule.entity";




@Injectable()
export class MeasureService {


    constructor(
        private readonly measureRepository: MeasureRepository,
        
        private readonly measureScheduleRepository: MeasureScheduleRepository,
    ) { }


    
    async getOneById(id:number) :Promise<Measure> {
        return this.measureRepository.findOneBy({id});
    }



    async scheduleMeasure(time: string, measureId: number, specification: String,schedule_id: number | null,limitInf:number | null,limitSup:number|null,marge: number |null): Promise<MeasureSchedule[]> {
        const newmesch = await this.measureScheduleRepository.createAndSave({
            time: time,
            measureId,
            specification,
            schedule_id,
            limitInf,
            limitSup,
            marge
            

        })


        return (this.measureScheduleRepository.save(newmesch))


    }


    async addMeasure(name: string, unit: Unit, limitInf: number, limitSup: number, measureType: MeasureType, marge: Number): Promise<Measure> {

        return await this.measureRepository.createAndSave({
            name,
            unit,
            limitInf,
            limitSup,
            measureType,
            marge

        });

    }



    async findByIds(ids: number[]): Promise<Measure[]> {

        if (ids.length === 0) {
            return await [];

        }
        return await this.measureRepository
            .createQueryBuilder('measure')
            .where('measure.id IN (:...ids)', { ids })
            .getMany();



    }
}