import { IsString, IsNumber, IsEmail, IsStrongPassword, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { isFloat32Array, isFloat64Array } from 'util/types';


export class CompleteUserProfileDto {
    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsString()
    @IsOptional()
    readonly surname?: string;


    @IsNumber()

    @IsOptional()
    readonly weight?: number;

    @IsNumber()
    @IsOptional()
    readonly height?: number;


    @IsOptional()
    readonly gender?: boolean;


    @IsString()
    @IsOptional()
    readonly birthdate?: string;

    @IsString()
    @IsOptional()
    readonly avatar?: string;



    @IsString()
    @IsOptional()
    readonly password?: string;








}
