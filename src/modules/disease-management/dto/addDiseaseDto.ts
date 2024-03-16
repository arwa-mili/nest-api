import { IsNotEmpty } from "class-validator"
import { Measure } from "../entities/measure.entity"

export class addDiseaseDto {


    @IsNotEmpty()
    readonly name: string

    @IsNotEmpty()
    readonly measures: Measure[]
}