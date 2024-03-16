import { IsString, IsNumber, IsEmail, IsStrongPassword, IsOptional } from 'class-validator';
import { Gender } from '../enums/gender';

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

    @IsString()
    @IsOptional()
    readonly gender?: Gender;
    @IsString()
    @IsOptional()
    readonly refreshToken?: string;


    @IsString()
    @IsOptional()
    readonly password?: string;





}
