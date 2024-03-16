import { IsEmail, IsString } from "class-validator";




export class emailsenddto {
    @IsString()
    @IsEmail()
    senderemail :string;
    @IsString()
    @IsEmail()
    receiveremail :string;
    @IsString()
   
    body:string;
    @IsString()
    subject:string



}