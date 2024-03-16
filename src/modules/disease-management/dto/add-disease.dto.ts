import { IsNotEmpty } from "class-validator"
import { Measure } from "../entities/measure.entity"
import { ApiProperty } from "@nestjs/swagger"
import { Schedule } from "../entities/schedule.entity"

export class addDiseaseDto {

    @ApiProperty()

    @IsNotEmpty()
    readonly name: string
    @ApiProperty()

    readonly schedules: Schedule[]
}