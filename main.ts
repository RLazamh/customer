import * as dotenv from 'dotenv';
dotenv.config(); // Cargar variables de entorno antes de cualquier otra cosa

import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/customer.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
