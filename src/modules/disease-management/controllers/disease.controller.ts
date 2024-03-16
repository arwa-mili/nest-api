import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { DiseaseService } from '../Service/disease.service';
import { Request } from 'express';

import { UpdateDiseaseDto } from '../dto/update-disease.dto';
import { addDiseaseDto } from '../dto/add-disease.dto';
import { Disease } from '../entities/disease.entity';
import { GuardsConsumer } from '@nestjs/core/guards';
import { AccessTokenGuard } from 'src/modules/auth/guards/access-token.guard';
import { diseaseIdsDTO } from '../dto/disease-ids.dto';

@Controller('disease')
export class DiseaseController {


    constructor(private diseaseService: DiseaseService) { }


    @Post('/')
    add(@Body() diseaseDto: addDiseaseDto): Promise<Disease> {

        return this.diseaseService.addDisease(diseaseDto.name, diseaseDto.schedules);

    }
    //shown to user on first register to tick diseases to track
    @Get('/')
    async findAll(): Promise<Disease[]> {
        return this.diseaseService.findAll();
    }


    @Get('/:id')
    getById(@Param('id') id: number): Promise<Disease> {
        return this.diseaseService.getDiseaseById(id);
    }

    @Patch('/:id')
    update(@Param('id') id: number,
        @Body() updateDiseaseDto: Partial<UpdateDiseaseDto>,
    ): Promise<Disease> {
        const { name, measureIds } = updateDiseaseDto;
        return this.diseaseService.updateDisease(id, name, measureIds);
    }
    //I move it here because I will use diseases entities more than user's ...
    //to add user's diseases on first signup and then add a disease when needed
    //accepts only one disease id or many disease's ids*
    @Post(":id/usersDiseases")
    addAffectedDisease(@Body() diseasesids: diseaseIdsDTO,@Param('id') id: number): Promise<void> {
        const userId = id
        //affect schedule based on infos 

        //front or back ??
        return this.diseaseService.addDiseasesOfUser(userId, diseasesids.diseases)


    }

    @Post(":id/removeUserDisease")
    removeDiseaseofUser(@Body()diseasesids: diseaseIdsDTO,@Param('id') id: number) : Promise<void> {
        const userId = id
        return this.diseaseService.removeDiseasesOfUser(userId, diseasesids.diseases)
    }





}

/*

 

    deleteDisease()

    
    

    addMeasure()

    deleteMeasureById()

    updateMeasure()
    */



