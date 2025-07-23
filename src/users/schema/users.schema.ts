import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserType {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  GUEST = 'guest',
}

@Schema()
export class Address {
  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zipCode: string;

  @Prop()
  country: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 6, maxlength: 12 })
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({
    type: String,
    enum: Object.values(UserType),
    default: UserType.CUSTOMER,
  })
  userType: UserType;

  @Prop({ type: AddressSchema })
  address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
