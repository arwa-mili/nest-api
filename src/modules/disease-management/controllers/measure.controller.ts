import { Body, Controller, Param, Post } from "@nestjs/common";
import { MeasureService } from "../Service/measure.service";
import { AddMeasureDto } from "../dto/add-measure.dto";
import { Measure } from "../entities/measure.entity";
import { AddMeasureScheduleDto } from "../dto/Add-measure-schedule.dto";
import { MeasureSchedule } from "../entities/measure-schedule.entity";

@Controller('measure')
export class MeasureController {


    constructor(private measureService: MeasureService) { }

    @Post('/')
    add(@Body() measureDto: AddMeasureDto): Promise<Measure> {
        return this.measureService.addMeasure(measureDto.name, measureDto.unit, measureDto.limitInf, measureDto.limitSup, measureDto.measureType, measureDto.marge);

    }
   




    @Post('/:id')
    createMeasureShedule(@Body() measureScheduleDto: AddMeasureScheduleDto, @Param('id') id: number): Promise<MeasureSchedule[]> {
        return this.measureService.scheduleMeasure(measureScheduleDto.time, measureScheduleDto.measureId = id, measureScheduleDto.specification ,measureScheduleDto.limitInf,measureScheduleDto.limitSup,measureScheduleDto.marge, measureScheduleDto.schedule_id = null)

    }

    



}