import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/users.schema';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './DTO/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async seedAdminUser() {
    const adminExists = await this.userModel.findOne({ userType: 'admin' });
    if (!adminExists) {
      const adminUser = new this.userModel({
        username: 'admin',
        email: 'saraabdelsalam.41@gmail.com',
        password: await bcrypt.hash('123456', 6), // hashed password
        userType: 'admin',
      });
      await adminUser.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  }
  async createUser(createUserDto: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 6);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
