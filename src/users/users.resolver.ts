/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserEntity)
  async updateUser(
    @Args('updateUserDto') updateUserDto: UpdateUserInput,
    @Context() context,
  ): Promise<UserEntity | null> {
    const user = context.req.user;
    console.log(`Updating user: ${JSON.stringify(user)}`);
    const updatedUser = await this.usersService.updateUser(
      user.id, // Ensure the user ID is a string
      updateUserDto,
    );
    return updatedUser as UserEntity | null;
  }
}
