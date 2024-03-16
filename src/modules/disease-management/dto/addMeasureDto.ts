import { IsNotEmpty, IsOptional } from "class-validator";
import { Unit } from "src/shared/enums/unit";
import { Disease } from "../entities/disease.entity";
import { MeasureType } from "../enums/measureType";

export class AddMeasureDto {


    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly unit: Unit;
    @IsOptional()
    readonly limitInf? : number;
    @IsOptional()
    readonly limitSup? : number;

    @IsNotEmpty()
    readonly measureType : MeasureType;

    @IsOptional()
    readonly marge? : Number;

}