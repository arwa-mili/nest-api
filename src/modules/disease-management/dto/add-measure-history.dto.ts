import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"





export class measurehistorydto {


    @ApiProperty()
    @IsNotEmpty()
    //is within range !
    //if it is within schedule it checks schedule range , otherwise it checks measure range

    readonly value: number

   

   




    

    

}