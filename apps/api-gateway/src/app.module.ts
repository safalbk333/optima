import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import {
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorController } from './modules/vendor/vendor.controller';
import { VendorGatewayService } from './modules/vendor/vendor.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';

@Module({
  imports: [
    // ✅ ENV Configuration
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ TCP Microservice Client
    ClientsModule.register([
      {
        name: 'VENDOR_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.VENDOR_SERVICE_HOST || 'localhost',
          port: Number(process.env.VENDOR_SERVICE_PORT) || 3001,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],

  controllers: [AppController, VendorController, AuthController],

  providers: [AppService, VendorGatewayService, AuthService],
})
export class AppModule { }