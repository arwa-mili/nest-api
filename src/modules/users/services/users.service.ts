import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { UserRepository } from '../repository/users.repository';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CompleteUserProfileDto } from '../dto/create-profile.dto';
import { switchMap, map } from 'rxjs/operators';
import { IUserRepository, USERTOKEN } from '../interfaces/IUser-repository.interface';
import { MedicalFile } from '../entities/medical-files.entity';
import { MeasureHistory } from 'src/modules/disease-management/entities/measure-history.entity';
import { measurehistorydto } from 'src/modules/disease-management/dto/add-measure-history.dto';
import { MeasureHistoryRepository } from 'src/modules/disease-management/repository/measure-history.repository';
import { MeasureService } from 'src/modules/disease-management/Service/measure.service';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {

  async findUserByEmailAndChangePassword(email: string, resetPassword: UpdateUserDto): Promise<Partial<User>> {

    return await this.userRepository.findByEmailAndUpdate(email, resetPassword)

  }
  /*
    @Inject(USERTOKEN)
    private readonly userRepo: IUserRepository
  
  */
  constructor(

    


    private readonly userRepository: UserRepository,
    @InjectRepository(MeasureHistoryRepository)
    private readonly measurehistoryrepo : MeasureHistoryRepository,
    private readonly measureService : MeasureService,
    


  ) { }



  async makemeasuredone(id:number,mesid : number,measue_history:measurehistorydto) : Promise<MeasureHistory> {

    const measure = await this.measureService.getOneById(mesid)
    const user = await this.userRepository.findById(id)
    return this.measurehistoryrepo.createAndSave(user,measure,measue_history)

  }


  async addmedicalfile(filename:string,id:number): Promise<User>{
    const user = await this.findOne(id)
    if (!Array.isArray(user.medicalfiles)) {
      user.medicalfiles = [];
  }
  const medicalFile = new MedicalFile();
  medicalFile.title = filename;
  user.medicalfiles.push(medicalFile);
  return await this.userRepository.save(user);
    
  }


  updateOne(id: number, user: CompleteUserProfileDto): Observable<any> {


    return from(this.userRepository.update(id, user)).pipe(
      switchMap(() => this.findOne(id))
    );
  }





  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id })
  }


  async completeProfile(cmpUserDto: CompleteUserProfileDto, id: Number): Promise<User> {

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    

    user.name = cmpUserDto.name;
    user.surname = cmpUserDto.surname;
    user.weight = cmpUserDto.weight;
    user.height = cmpUserDto.height;
    user.gender = cmpUserDto.gender;
    user.birthdate=cmpUserDto.birthdate;
    //user.avatar = cmpUserDto.avatar;


    this.userRepository.save(user);


    return user;
  }
  async findById(id: Number): Promise<User> {
    const user = await this.userRepository.findById(id);
    return user;

  }


  async update(
    id: Number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userRepository.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: Number): Promise<void> {
    const user = await this.findById(id)
    await this.userRepository.remove(user)
  }

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
