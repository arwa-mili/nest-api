

import { IsNotEmpty, IsOptional, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class AddMeasureScheduleDto {


    


   
    @ApiProperty()

    @IsNotEmpty()
    specification: String;


    @ApiProperty()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'Invalid time format. Must be in HH:MM:SS format and within valid range.'
    })
    @IsNotEmpty()
    time: string



    @ApiProperty()

    @IsOptional()
    measureId: number;

    @ApiProperty()

    @IsOptional()

    schedule_id?: number | null;

    @ApiProperty()

    @IsOptional()
 
    limitInf?: number;
    // put non daily specific diseases measures with laboratory measures
/*
    @ApiProperty()

 
    isDaily: boolean;
    */
    @ApiProperty()

    @IsOptional()

    limitSup?: number;

    @ApiProperty()

    @IsOptional()
   
    marge?: number;








}