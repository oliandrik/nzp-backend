import * as dotenv from 'dotenv';
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

dotenv.config({ path: '../.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  const PORT = process.env.PORT || 4040;

  await app.listen(PORT, null, () => {
    console.log(`port ${PORT}`);
  });
  // await app.listen(PORT || 8080);
}
bootstrap();
