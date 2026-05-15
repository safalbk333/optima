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
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { ContractController } from './modules/contract/contract.controller';
import { ContractGatewayService } from './modules/contract/contract.service';
import { CategoryController } from './modules/category/category.controller';
import { CategoryGatewayService } from './modules/category/category.service';

@Module({
  imports: [
      // ✅ ENV Configuration
      ConfigModule.forRoot({
        isGlobal: true,
      }),

    // ✅ TCP Microservice Clients
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
      {
        name: 'CONTRACTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],

  controllers: [AppController, VendorController,QuotationController,ItemController,AuthController, ContractController, CategoryController],

  providers: [AppService, VendorGatewayService,QuotationGatewayService,ItemGatewayService, AuthService,ContractGatewayService, CategoryGatewayService],
})
export class AppModule { }