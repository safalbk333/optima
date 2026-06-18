import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('UserService');
  
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.TCP,
        options: {
          host: process.env.HOST || '0.0.0.0',
          port: Number(process.env.PORT) || 3007,
        },
        logger: ['log', 'error', 'warn', 'debug', 'verbose'],
      },
    );
    
  await app.listen();
  
  logger.log(
    `User Service running on TCP ${process.env.PORT || 3007}`,
  );
}
bootstrap();
