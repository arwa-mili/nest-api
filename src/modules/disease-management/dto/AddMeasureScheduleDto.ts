

import { IsNotEmpty, IsOptional } from "class-validator";
import { Time } from "../entities/time.entity";


export class AddMeasureScheduleDto {




    @IsOptional()
    hours: Time[] | null;

    @IsNotEmpty()
    specification: String;



    @IsOptional()
    measureId: number;


    @IsOptional()

    schedule_id?: number | null;






}