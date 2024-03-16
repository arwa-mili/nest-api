import { IsNotEmpty, IsOptional } from "class-validator";

export class AddScheduleDto {


    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    specification: string


    



}