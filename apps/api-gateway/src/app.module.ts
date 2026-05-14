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
import { QuotationController } from './modules/quotation/quotation.controller';
import { QuotationGatewayService } from './modules/quotation/quotation.service';
import { ItemGatewayService } from './modules/item/item.service';
import { ItemController } from './modules/item/item.controller';

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
  ],

  controllers: [AppController,VendorController,QuotationController,ItemController],

  providers: [AppService,VendorGatewayService,QuotationGatewayService,ItemGatewayService],
})
export class AppModule {}