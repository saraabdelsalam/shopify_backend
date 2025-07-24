import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const createdProduct = new this.productModel(createProductInput);
    return createdProduct.save();
  }

  findAll() {
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    const productId = new Types.ObjectId(id);
    if (!productId) {
      throw new Error('Invalid product ID');
    }
    return this.productModel.findById(productId).exec();
  }

  update(id: string, updateProductInput: UpdateProductInput) {
    const productId = new Types.ObjectId(id);
    return this.productModel
      .findByIdAndUpdate(productId, updateProductInput, { new: true })
      .exec();
  }

  remove(id: string) {
    const productId = new Types.ObjectId(id);
    if (!productId) {
      throw new Error('Invalid product ID');
    }
    return this.productModel.findByIdAndDelete(productId).exec();
  }
}
