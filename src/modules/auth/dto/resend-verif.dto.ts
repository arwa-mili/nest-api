import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";





export class ResendVerifDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct email ' })
    readonly email: string;



  
}