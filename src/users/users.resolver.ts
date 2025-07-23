import { Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserEntity, AddressEntity } from './entities/user.entity';
import { CreateUserInput } from './DTO/create-user.input';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  // Resolver methods will be defined here
  //Register new user mutation
  @Mutation(() => UserEntity)
  async createUser(createUserDto: CreateUserInput): Promise<UserEntity> {
    const user = await this.usersService.createUser(createUserDto);
    // Map the returned user to UserEntity
    const userEntity = new UserEntity();
    Object.assign(userEntity, user, {
      address: user.address
        ? Object.assign(new AddressEntity(), user.address)
        : undefined,
    });
    return userEntity;
  }
  // Other resolver methods can be added here
}
