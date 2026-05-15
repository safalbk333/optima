import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService =
    app.get(ConfigService);

  app.enableCors();

  // ✅ ENV Variables
  const port =
    configService.get<number>('PORT') || 3000;

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
    `API Gateway running on: http://localhost:${port}`,
  );

  console.log(
    `Swagger running on: http://localhost:${port}/api`,
  );
}

bootstrap();