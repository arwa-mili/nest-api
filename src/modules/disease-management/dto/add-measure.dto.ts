import { IsNotEmpty, IsOptional } from "class-validator";
import { Unit } from "src/shared/enums/unit.enum";
import { Disease } from "../entities/disease.entity";
import { MeasureType } from "../enums/measure-type.enum";
import { ApiProperty } from "@nestjs/swagger";

export class AddMeasureDto {

    @ApiProperty()

    @IsNotEmpty()
    readonly name: string;
    @ApiProperty()


    @IsNotEmpty()
    readonly unit: Unit;
    @ApiProperty()

    @IsOptional()
    readonly limitInf?: number;
    @ApiProperty()

    @IsOptional()
    readonly limitSup?: number;
    @ApiProperty()

    @IsNotEmpty()
    readonly measureType: MeasureType;
    @ApiProperty()
    @IsOptional()
    readonly marge?: Number;

}