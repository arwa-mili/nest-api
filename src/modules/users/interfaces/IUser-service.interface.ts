import { Observable } from 'rxjs';
import { CompleteUserProfileDto } from '../dto/create-profile.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';


export interface IUsersService {
  findUserByEmailAndChangePassword(email: string, resetPassword: UpdateUserDto): Promise<Partial<User>>;
  updateOne(id: number, user: CompleteUserProfileDto): Observable<any>;
  findOne(id: number): Promise<User>;
  completeProfile(cmpUserDto: CompleteUserProfileDto, id: Number): Promise<User>;
  findById(id: Number): Promise<User>;
  update(id: Number, updateUserDto: UpdateUserDto): Promise<User>;
  remove(id: Number): Promise<void>;
  findAll(): Promise<User[]>;
}