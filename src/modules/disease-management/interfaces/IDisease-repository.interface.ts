import { Disease } from "../entities/disease.entity";






export interface IDiseaseRepository {

    createAndSave(disease: Partial<Disease>): Promise<Disease>;
    findById(id: number): Promise<Disease>;



}