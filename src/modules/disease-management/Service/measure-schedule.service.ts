import { Injectable } from "@nestjs/common";



import { MeasureScheduleRepository } from "../repository/measure-schedule.repository";
import { MeasureSchedule } from "../entities/measure-schedule.entity";




@Injectable()
export class MeasureScheduleService {


    constructor(
       
        
        private readonly measureScheduleRepository: MeasureScheduleRepository,
    ) { }




    async findMeasuresByTimeAndMesureId(mesid:number,time:string):Promise<MeasureSchedule[]> {

        const measures = await this.measureScheduleRepository.findByMeasureIdsAndTime(mesid,time)
        return measures
    }





    }