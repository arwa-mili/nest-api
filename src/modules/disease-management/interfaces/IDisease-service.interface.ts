import { Disease } from "../entities/disease.entity";
import { Schedule } from "../entities/schedule.entity";



export interface IDiseaseService {

    addDiseasesOfUser(userId: number, diseaseIds: number[]): Promise<void>;
    addDisease(name: string, schedules: Schedule[]): Promise<Disease>;
    getDiseaseById(id: number): Promise<Disease>;
    updateDisease(id: number, name: string, measureIds: number[]): Promise<Disease>;
    findAll(): Promise<Disease[]>;


}