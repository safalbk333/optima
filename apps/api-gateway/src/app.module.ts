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
import { KeycloakController } from './modules/authentication/keycloak/keycloak.controller';
import { PermissionsController } from './modules/authentication/permissions/permissions.controller';
import { GroupRolesController } from './modules/authentication/roles/roles.controller';

console.log('NODE_ENV =>', process.env.NODE_ENV);

@Module({
  imports: [
    // ✅ ENV Configuration
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `apps/api-gateway/.env.${process.env.NODE_ENV || 'development'}`,
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
          host: process.env.AUTH_SERVICE_HOST || 'localhost',
          port: Number(process.env.AUTH_SERVICE_PORT) || 3004,
        },
      },
      {
        name: 'CONTRACTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.CONTRACTS_SERVICE_HOST || 'localhost',
          port: Number(process.env.CONTRACTS_SERVICE_PORT) || 3003,
        },
      },
      
    ]),
  ],

  controllers: [AppController,
    VendorController,
    QuotationController,
    AuthController,
    ItemController,
    ContractController,
    CategoryController,
    KeycloakController,
    PermissionsController,
    GroupRolesController
  ],

  providers: [AppService,
    VendorGatewayService,
    QuotationGatewayService,
    ItemGatewayService,
    AuthService,
    ContractGatewayService,
    CategoryGatewayService,
   ],
})
export class AppModule {
  constructor() {

        // ✅ Log loaded env values
    console.log('================ ENV VALUES ================');

    console.log('VENDOR_SERVICE_HOST =>', process.env.VENDOR_SERVICE_HOST);
    console.log('VENDOR_SERVICE_PORT =>', process.env.VENDOR_SERVICE_PORT);

    console.log('AUTH_SERVICE_HOST =>', process.env.AUTH_SERVICE_HOST);
    console.log('AUTH_SERVICE_PORT =>', process.env.AUTH_SERVICE_PORT);

    console.log(
      'CONTRACTS_SERVICE_HOST =>',
      process.env.CONTRACTS_SERVICE_HOST,
    );
    console.log(
      'CONTRACTS_SERVICE_PORT =>',
      process.env.CONTRACTS_SERVICE_PORT,
    );

  }
 }