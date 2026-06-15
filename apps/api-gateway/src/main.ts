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
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'ngrok-skip-browser-warning', 'client',],
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