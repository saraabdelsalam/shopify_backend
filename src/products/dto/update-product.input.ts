import { CreateProductInput } from './create-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => String)
  id: string;
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  description?: string;
  @Field(() => Int, { nullable: true })
  price?: number;
  @Field(() => Int, { nullable: true })
  stock?: number;
  @Field({ nullable: true })
  imageUrl?: string;
  @Field(() => [String], { nullable: true })
  tags?: string[];
}
