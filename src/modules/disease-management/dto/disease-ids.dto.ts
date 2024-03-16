import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty } from "class-validator";

export class diseaseIdsDTO {

    @ApiProperty({ name: "diseases", type: [Number] })
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    diseases: number[];








}