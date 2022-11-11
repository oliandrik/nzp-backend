import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  const PORT = 8080;

  await app.listen(PORT, null, () => {
    console.log(`port ${PORT}`);
  });
  // await app.listen(parseInt(process.env.PORT) || 8080);
}
bootstrap();
