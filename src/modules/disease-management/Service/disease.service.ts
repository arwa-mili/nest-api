import { Injectable, NotFoundException } from '@nestjs/common';
import { DiseaseRepository } from '../repository/disease.repository';

import { Disease } from '../entities/disease.entity';
import { UsersService } from 'src/modules/users/services/users.service';
import { Schedule } from '../entities/schedule.entity';
import { IDiseaseService } from '../interfaces/IDisease-service.interface';
import { DiseaseUserSchedule } from '../entities/disease-user-schedule.entity';
import { DiseaseUserScheduleService } from './disease-user-schedule.service';

@Injectable()
export class DiseaseService implements IDiseaseService {

    constructor(
        private readonly diseaseRepository: DiseaseRepository,

        private readonly diseaseUserScheduleService: DiseaseUserScheduleService,


        private readonly userService: UsersService,
    ) { }

 // make dto
    async addDiseasesOfUser(userId: Number, diseasesids: number[]): Promise<void> {
        const user = await this.userService.findById(userId);

        if (!Array.isArray(diseasesids)) {
            throw new Error("diseasesids must be an array");
        }
        const promises = diseasesids.map(async (element, index) => {
            const disease = await this.diseaseRepository.findById(element);
            if (disease) {
                if (!Array.isArray(disease.usersaffected)) {
                    disease.usersaffected = [];
                }
                disease.usersaffected.push(user);
                await this.diseaseRepository.save(disease);
                //create diseaseuserschedule entity
                
                
                const diseaseUserScheduledto = {
                    userid:user.id,
                    diseaseid: disease.id,
                    scheduleid:null
                };
                console.log(diseaseUserScheduledto)

                await this.diseaseUserScheduleService.createAndSave(diseaseUserScheduledto)
           
            }

        });

        await Promise.all(promises);
    }



    async removeDiseasesOfUser(userId:number, diseasesids:number[]):Promise<void> {
        const user = await this.userService.findById(userId);

        if (!Array.isArray(diseasesids)) {
            throw new Error("diseasesids must be an array");
        }
        const promises = diseasesids.map(async (element, index) => {
            const disease = await this.diseaseRepository.findById(element);
            if (disease) {
                if (!Array.isArray(disease.usersaffected)) {
                    disease.usersaffected = [];
                }
                disease.usersaffected = disease.usersaffected.filter((affectedUser) => affectedUser.id !== user.id);
                await this.diseaseRepository.save(disease);
                //remove diseaseuserschedule entity
                

                //await this.diseaseUserScheduleService.createAndSave(diseaseUserScheduledto)
           
            }

        });

        await Promise.all(promises);
                


           



    }






    async addDisease(name: string, schedules: Schedule[]): Promise<Disease> {


        if (!schedules) {
            schedules = []
        }
        const disease = await this.diseaseRepository.createAndSave({
            name,
            schedules,
        });
        return disease;
    }

    async getDiseaseById(id): Promise<Disease> {
        const disease = await this.diseaseRepository.findById(id);
        return disease;

    }

    async updateDisease(id, name, measureIds): Promise<Disease> {



        let currentdisease = await this.getDiseaseById(id);

        console.log(currentdisease)

        if (!currentdisease) {
            throw new NotFoundException('Disease not found');
        }
        currentdisease.name = name;


        if (!(currentdisease.schedules)) {
            currentdisease.schedules = [];
        }


        //const newMeasures = await this.measureService.findByIds(measureIds);
        //currentdisease.schedules.push(...newMeasures);

        return this.diseaseRepository.save(currentdisease);


    }


    async findAll(): Promise<Disease[]> {
        return await this.diseaseRepository.findAll();
    }

}