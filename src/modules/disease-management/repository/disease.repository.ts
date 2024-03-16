import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { IDiseaseRepository } from "../interfaces/IDisease-repository.interface";
import { addDiseaseDto } from "../dto/add-disease.dto";
import { Disease } from "../entities/disease.entity";


@Injectable()
export class DiseaseRepository extends Repository<Disease> implements IDiseaseRepository {


    constructor(
        private readonly datasource: DataSource
    ) { super(Disease, datasource.createEntityManager()) }


    async findAll(): Promise<Disease[]> {
        return await this.createQueryBuilder('disease')
            .leftJoinAndSelect('disease.schedules', 'schedules')
            //.leftJoinAndSelect('disease.usersaffected', 'usersaffected')
            .getMany();
    }


    //findByIds 


    createAndSave(diseaseData: addDiseaseDto): Promise<Disease> {
        const newDisease = this.create(diseaseData);
        return this.save(newDisease);
    }


    findById(id: number): Promise<Disease> {
        const disease = this.findOne({
            where: {
                id: id
            },
            relations: ['schedules']
        });
        return disease;
    }


}



