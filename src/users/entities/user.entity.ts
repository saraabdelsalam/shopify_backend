/* 
✅ Used for GraphQL Output (API response layer)
Defines what data you expose to clients through the GraphQL API.
Uses @ObjectType() and @Field() decorators.
Maps to what users can query from the API.
🧠 Think of it as: “What clients can see from the DB model.”
*/
import { ObjectType, Field } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';
import { role } from '../enums/user-type.enum';

registerEnumType(role, {
  name: 'UserType', // this must match the GraphQL name
  description: 'The type of user', // optional
});
@ObjectType()
export class AddressEntity {
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

@ObjectType()
export class UserEntity {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => role, { defaultValue: role.CUSTOMER })
  userType: role;

  @Field(() => AddressEntity, { nullable: true })
  address?: AddressEntity;
}
