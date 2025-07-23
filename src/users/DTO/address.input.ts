// src/users/DTO/address.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddressInput {
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
