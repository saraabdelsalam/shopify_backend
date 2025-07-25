/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver(() => ProductEntity)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ProductEntity)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @Context() context,
  ) {
    console.log(`current user: ${JSON.stringify(context.req.user)}`);
    const createdProduct =
      await this.productsService.create(createProductInput);
    if (!createdProduct) {
      throw new Error('Product creation failed');
    }
    return createdProduct;
  }

  @Query(() => [ProductEntity], { name: 'products' })
  async findAll() {
    const products = await this.productsService.findAll();
    if (!products || products.length === 0) {
      throw new Error('No products found');
    }
    return products;
  }

  @Query(() => ProductEntity, { name: 'product' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }
  // only user with admin role can update or delete products
  @Mutation(() => ProductEntity)
  @UseGuards(GqlAuthGuard)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    const updatedProduct = await this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
    if (!updatedProduct) {
      throw new Error(`Product with ID ${updateProductInput.id} not found`);
    }
    return updatedProduct;
  }

  @Mutation(() => ProductEntity)
  @UseGuards(GqlAuthGuard)
  async removeProduct(@Args('id', { type: () => String }) id: string) {
    const result = await this.productsService.remove(id);
    if (!result) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return result;
  }
}
