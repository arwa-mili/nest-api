import { ApiProperty } from "@nestjs/swagger";



export class DiseaseUserScheduleDto {

    @ApiProperty({

    })
    userid:Number;
    @ApiProperty({

    })
    diseaseid:Number;
    @ApiProperty({

    })
    scheduleid:Number |null;

}