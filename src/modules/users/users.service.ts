import { Injectable, NotFoundException } from '@nestjs/common';

import { CompleteUserProfileDto } from './dto/createProfile.dto';
import { UserRepository } from './repository/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {

  async findUserByEmailAndChangePassword(email: string, resetPassword: UpdateUserDto): Promise<Partial<User>> {
    
    return await this.userRepository.findByEmailAndUpdate(email,resetPassword)

  }
  constructor(

    private readonly userRepository: UserRepository,
  ) { }

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
