import { Controller, Get, Post, Body, UseGuards, Put, Req, Delete, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

import { Request } from 'express';
import { CompleteUserProfileDto } from './dto/createProfile.dto';
import { User } from './entities/user.entity';
import { AccessTokenStrategy } from '../auth/strategies/jwt.strategy';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { UpdateUserDto } from './dto/updateUser.dto';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }


  //bech naawedha
  @Put('/complete')
  @UseGuards(AccessTokenGuard)
  async completeProfile(@Body() createUserDto: CompleteUserProfileDto, @Req() req: Request): Promise<User> {
    const userId = req.user['sub'];

    console.log(req.user)
    return this.usersService.completeProfile(createUserDto, userId);
  }


  @UseGuards(AccessTokenGuard)
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

