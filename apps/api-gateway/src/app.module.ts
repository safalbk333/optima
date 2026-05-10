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
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],

  controllers: [AppController,VendorController],

  providers: [AppService,VendorGatewayService],
})
export class AppModule {}