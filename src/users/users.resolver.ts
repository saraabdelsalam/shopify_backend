import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserEntity, AddressEntity } from './entities/user.entity';
import { CreateUserInput } from './DTO/create-user.input';
import { UpdateUserInput } from './DTO/update.user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  // Resolver methods will be defined here

  @Query(() => String)
  sayHello(): string {
    return 'Hello from Shopify Backend!';
  }
  //Register new user mutation
  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserInput,
  ): Promise<UserEntity> {
    const user = await this.usersService.createUser(createUserDto);
    // Map the returned user to UserEntit
    return user.toObject() as UserEntity;
  }
  // Other resolver methods can be added here
  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserEntity)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserDto') updateUserDto: UpdateUserInput,
  ): Promise<UserEntity | null> {
    console.log('Updating user with ID:', id, 'and data:', updateUserDto);
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    if (!updatedUser) {
      return null; // or throw an error if preferred
    }
    return updatedUser.toObject() as UserEntity;
  }
}
