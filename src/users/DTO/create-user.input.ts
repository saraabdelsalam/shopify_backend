/* Used for GraphQL Input (API write layer)
Defines what fields are allowed when creating or updating a user.
Uses @InputType() and @Field() decorators.
Only includes what the client can send to the server.
🧠 Think of it as: “What the client is allowed to send in a mutation.”*/
import { InputType, Field } from '@nestjs/graphql';
import { UserType } from '../schema/users.schema';
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

  @Field({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  zipCode?: string;

  @Field({ nullable: true })
  country?: string;
}
