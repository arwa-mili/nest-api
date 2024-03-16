import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../repository/schedule.repository';
import { Schedule } from '../entities/schedule.entity';
import { AddScheduleDto } from '../dto/add-schedule.dto';
import { DiseaseService } from './disease.service';
import { MeasureScheduleService } from './measure-schedule.service';



@Injectable()
export class ScheduleService {

    constructor(
        private readonly scheduleRepository: ScheduleRepository,
        private readonly diseaseService: DiseaseService,

        private readonly measureScheduleService: MeasureScheduleService,


    ) { }


    async findAll() {
        return await this.scheduleRepository.findAll()
    }





    async addSchedule(scheduleDto: AddScheduleDto, id: number): Promise<Schedule> {

        const disease = await this.diseaseService.getDiseaseById(id)
        const schedule = await this.scheduleRepository.createAndSave(
            scheduleDto,
            disease
        );
        return schedule;
    }

    async addScheduledMeasureToDiseaseSchedule(id: number, mesid: number, time: string): Promise<Schedule> {

        const schedule = await this.scheduleRepository.findOneBy({ id })
        // find all schedules of measure mesid x at time y
        console.log(schedule)
        const measuresScheduled = await this.measureScheduleService.findMeasuresByTimeAndMesureId(mesid, time)
        // add them to schedule with id id
        console.log("measuresscheduled",measuresScheduled)
        measuresScheduled.forEach(measure => schedule.addMeasureSchedule(measure));
        
        return this.scheduleRepository.save(schedule)








    }






}