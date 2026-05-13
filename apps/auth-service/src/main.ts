import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
async function bootstrap() {
  // const app = await NestFactory.create(AuthServiceModule);
    const app =
      await NestFactory.createMicroservice<MicroserviceOptions>(
        AuthServiceModule,
        {
          transport: Transport.TCP,
  
          options: {
            host: 'localhost',
            port: Number(process.env.AUTH_SERVICE_PORT) || 3002,
          },
        },
      );
  
    await app.listen();
      console.log(
    `Auth Service running on TCP ${process.env.AUTH_SERVICE_PORT || 3002}`,
  );
}
bootstrap();
