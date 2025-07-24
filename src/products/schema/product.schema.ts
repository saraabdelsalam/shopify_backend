import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  declare _id: string; // Ensure _id is of type string
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true, MIN_VALUE: 20 })
  price: number;
  @Prop({ default: 0 })
  stock: number;
  imageUrl?: string;
  tags?: string[];
  @Prop({ default: Date.now })
  createdAt?: Date;
  @Prop({ default: Date.now })
  updatedAt?: Date;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.set('timestamps', true); // Automatically manage createdAt and updatedAt fields
ProductSchema.index({ title: 'text', description: 'text' }); // Create a text
