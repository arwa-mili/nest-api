import { Body, Injectable } from "@nestjs/common";
import { DiseaseUserScheduleRepository } from "../repository/disease-user-schedule.repository";
import { DiseaseUserSchedule } from "../entities/disease-user-schedule.entity";
import { Disease } from "../entities/disease.entity";
import { User } from "src/modules/users/entities/user.entity";
import { DiseaseUserScheduleDto } from "../dto/disease-user-schedule.dto";




@Injectable()
export class DiseaseUserScheduleService {


    constructor(
       private diseaseuserscheduleRepo: DiseaseUserScheduleRepository
    ) { }



    async createAndSave(entitydto:DiseaseUserScheduleDto): Promise<DiseaseUserSchedule>{

        try{

        return  await this.diseaseuserscheduleRepo.createAndSave(entitydto)


        } catch(error) {
            console.log(error)
        }
    }



}