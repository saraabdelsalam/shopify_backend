/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schema/users.schema';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './DTO/create-user.input';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './DTO/update.user.input';
import { console } from 'inspector';

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
  async updateUser(
    id: string,
    updateUserDto: UpdateUserInput,
  ): Promise<User | null> {
    // pass id as object by converting it to ObjectId
    const userId = new Types.ObjectId(id);
    const user = await this.userModel.findOne({ _id: userId }).exec();
    console.log(`User found: ${JSON.stringify(user)}`);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    // 3. Handle nested address update
    if (updateUserDto.address) {
      // change only provided fields in address
      const updatedAddress = {
        // Convert existing address to plain object if it exists
        ...(user.address ? user.address.toObject() : {}),
        ...updateUserDto.address, // Merge with new address data
      };
      updateUserDto.address = updatedAddress; // Assign the updated address back to the DTO
    } else {
      // if address is not provided keep the existing address
      updateUserDto.address = user.address;
    }
    // 4. Update remaining fields
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    return updatedUser;
  }
  catch(error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}
