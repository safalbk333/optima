import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.TCP,

        options: {
          host: process.env.HOST || '0.0.0.0',
          port: Number(process.env.PORT) || 3006,
        },
      },
    );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen();

  console.log(
    `Request Service running on TCP ${process.env.PORT || 3006}`,
  );

}

bootstrap();
