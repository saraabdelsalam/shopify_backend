import 'reflect-metadata'; // <-- This must be the first import
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Bootstrapping...');
  const app = await NestFactory.create(AppModule);
  console.log('App created');
  await app.listen(3000);
}
void bootstrap();
