/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Load environment variables from .env file
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      introspection: true,
      driver: ApolloDriver,
      context: ({ req }) => ({ req }), // Pass the request object to the context
    }),
    UsersModule,
    AuthModule,
    ProductsModule, // Import AuthModule for authentication features
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly UserService: UsersService) {}
  // Seed the admin user when the application starts
  async onModuleInit() {
    await this.UserService.seedAdminUser();
    console.log('Admin user seeded');
  }
}
