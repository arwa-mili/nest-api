import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Matches, MinLength, ValidateIf, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { IsEqual } from 'src/common/validator-constraints/validators-constraints';

export class SignUpDto {

    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct email' })
    readonly email: string;

    @IsNotEmpty()
    @IsNumber( {},{ message: 'Please enter a valid phone number' }) 
    phoneNumber: number;



    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    readonly password: string;


    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    @IsEqual('password', { message: 'Passwords must match' })
    readonly confirmPassword: string;
}

