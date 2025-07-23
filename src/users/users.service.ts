import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/users.schema';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './DTO/create-user.input';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(createUserDto: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  async login(email: string, password: string): Promise<User[]> {
    return this.userModel.find({ email, password }).exec();
  }
}
