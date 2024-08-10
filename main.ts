import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.SERVICE_PORT));
  console.log('Costumer service listening in port: ', process.env.SERVICE_PORT);
}
bootstrap();
