import { Controller, Get, Post, Body, UseGuards, Put, Delete, Param, Patch, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { CompleteUserProfileDto } from '../dto/create-profile.dto';
import { UpdateUserDto } from '../dto/update-user.dto';


import { join } from 'path';




import { Observable, map, of, tap } from 'rxjs';
import { fileuploadingService } from 'src/shared/modules/file-upload-module/service/file-uploading.service';
import { measurehistorydto } from 'src/modules/disease-management/dto/add-measure-history.dto';
import { MeasureHistory } from 'src/modules/disease-management/entities/measure-history.entity';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { FormDataTestDto } from 'src/shared/modules/file-upload-module/dto/file.dto';




@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService,private readonly uploadService: fileuploadingService) {


    
   }


  @Post(':id/:mesid/addNewMeasuretoHistory')
  addNewMeasuretoHistory(@Param('id') id: number,@Param('mesid') mesid: number, @Body() measurehistory: measurehistorydto) : Promise<MeasureHistory>  {

    return this.usersService.makemeasuredone(id,mesid,measurehistory);
    

  };





  @Put(':id')
  updateOne(@Param('id') id: string, @Body() user: CompleteUserProfileDto): Observable<any> {
    return this.usersService.updateOne(Number(id), user);
  }


  @Post(':id/upload-image')
  @FormDataRequest({storage: MemoryStoredFile})
  async uploadFile(@Body() file :FormDataTestDto, @Param("id") id: number,): Promise<Observable<Object>> {
    console.log(file)
    
      const filename = await this.uploadService.uploadfile(file)
      
       return this.usersService.updateOne(id, { avatar: filename }).pipe(
        tap((user: User) => console.log(user)),
        map((user: User) => ({ profileImage: user.avatar }))
       );
    
  }

  @Post(':id/upload-file')
  @FormDataRequest({storage: MemoryStoredFile})
  async uploadmedicalfile(@Body() file: FormDataTestDto, @Param("id") id: number,): Promise<User>{
    
      const filename = await this.uploadService.uploadfile(file)
      return this.usersService.addmedicalfile(filename,id)
      
      
    
  }
  

  @Get('profile-image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object> {

    return of(res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename)));
  }



  @Patch(':id/complete')
  completeProfile(@Body() createUserDto: CompleteUserProfileDto, @Param("id") id: number): Promise<User> {
    const userId = id;
    return this.usersService.completeProfile(createUserDto, userId);
  }



  @Patch(':id')
  update(@Param('id') id: Number, @Body() updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    return this.usersService.update(id, updateUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }


  @Delete(':id')
  remove(@Param('id') id: Number) {
    return this.usersService.remove(id);
  }

}

