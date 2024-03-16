import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MeasureService } from "../Service/measure.service";
import { AddMeasureDto } from "../dto/add-measure.dto";
import { Measure } from "../entities/measure.entity";
import { Schedule } from "../entities/schedule.entity";
import { ScheduleService } from "../Service/schedule.service";
import { AddScheduleDto } from "../dto/add-schedule.dto";

@Controller('schedule')
export class ScheduleController {


    constructor(private scheduleService: ScheduleService) { }
    
        @Post('diseaseMeasures/:id')
        add(@Param("id")id :number,@Body() scheduleDto: AddScheduleDto): Promise<Schedule> {
            return this.scheduleService.addSchedule(scheduleDto,id);
    
        }

        @Post('/:id/:mesid/:time')
        addScheduledMeasureToDiseaseSchedule(@Param("id")id:number, @Param("mesid")mesid:number,@Param("time") time:string) {


            return this.scheduleService.addScheduledMeasureToDiseaseSchedule(id,mesid,time)
            
        }
        @Get('/')
        findAll(){
            return this.scheduleService.findAll()
        }



    
        


}