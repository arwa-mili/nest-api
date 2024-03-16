import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";




export class VerifyCodeDto {
    @ApiProperty()
    @IsNotEmpty()

    @IsEmail({}, { message: 'Please enter correct email ' })
    readonly email: string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly code?: string;

  
}