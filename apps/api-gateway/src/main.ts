import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://outpour-unnamable-oink.ngrok-free.dev',
    ],
    credentials: true,
  });

  const configService =
    app.get(ConfigService);


  // ✅ ENV Variables
  const port =
    configService.get<number>('PORT') || 3000;
  const host =
    configService.get<string>('HOST') || '0.0.0.0';
  const appName =
    configService.get<string>('APP_NAME');

  const appDescription =
    configService.get<string>('APP_DESCRIPTION');

  const appVersion =
    configService.get<string>('APP_VERSION');

  // ✅ Swagger Config
  const config = new DocumentBuilder()
    .setTitle(appName || 'API')
    .setDescription(
      appDescription || 'API Documentation',
    )
    .setVersion(appVersion || '1.0')
    .addBearerAuth()
    .build();

  const document =
    SwaggerModule.createDocument(
      app,
      config,
    );

  SwaggerModule.setup(
    'api',
    app,
    document,
  );

  await app.listen(port);

  console.log(
    `API Gateway running on: http://${host}:${port}`,
  );

  console.log(
    `Swagger running on: http://${host}:${port}/api`,
  );
}

bootstrap();