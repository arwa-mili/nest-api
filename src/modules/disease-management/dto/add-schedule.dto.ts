import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddScheduleDto {

    @ApiProperty({

    })
    @IsNotEmpty()
    title: string;
    @ApiProperty({

    })
    @IsNotEmpty()
    specification: string









}