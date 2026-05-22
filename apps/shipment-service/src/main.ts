import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
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
          host: process.env.HOST || 'localhost',
          port: Number(process.env.PORT) || 3003,
        },
      },
    );
    
  await app.listen();
  console.log(
    `Shipment Service running on TCP ${process.env.PORT || 3003}`,
  );
}

bootstrap();