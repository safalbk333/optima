import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {

  const port = Number(process.env.PORT) || 3002;
  const host = process.env.HOST || 'localhost';


  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AuthServiceModule,
      {
        transport: Transport.TCP,

        options: {
          host: host,
          port: port,
        },
      },
    );


  await app.listen();
  console.log(
    `Auth Service running on TCP ${port}`,
  );
}
bootstrap();
