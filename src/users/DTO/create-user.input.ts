/* Used for GraphQL Input (API write layer)
Defines what fields are allowed when creating or updating a user.
Uses @InputType() and @Field() decorators.
Only includes what the client can send to the server.
🧠 Think of it as: “What the client is allowed to send in a mutation.”*/
import { InputType, Field } from '@nestjs/graphql';
import { AddressInput } from './address.input';
import { UserType } from '../enums/user-type.enum';
@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => UserType, { defaultValue: UserType.CUSTOMER })
  userType?: UserType;
  @Field(() => AddressInput, { nullable: true })
  address?: AddressInput;
}
