import { InputType, Field } from '@nestjs/graphql';
import { AddressInput } from './address.input';
@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  username: string;
  @Field({ nullable: true })
  address: AddressInput;
}
