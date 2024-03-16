import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, MinLength, ValidateIf } from 'class-validator';


export class LoginDto {
    @IsNotEmpty()
    @ApiProperty()
    @ValidateIf(o => typeof o.login === 'string') 
    @IsEmail({}, { message: 'Please enter a valid email' }) 
    @ValidateIf(o => typeof o.login === 'number') 
    @IsPhoneNumber('TN', { message: 'Please enter a valid phone number' }) 
    login: string | Number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @MinLength(8)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    readonly password: string;
}