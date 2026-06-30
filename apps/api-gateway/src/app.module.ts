import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorController } from './modules/vendor-service/vendor/vendor.controller';
import { VendorGatewayService } from './modules/vendor-service/vendor/vendor.service';
import { QuotationController } from './modules/vendor-service/vendor/quotation/quotation.controller';
import { QuotationGatewayService } from './modules/vendor-service/vendor/quotation/quotation.service';
import { ItemGatewayService } from './modules/master-service/item/item.service';
import { ItemController } from './modules/master-service/item/item.controller';

import { ContractController } from './modules/contract-service/contract/contract.controller';
import { ContractGatewayService } from './modules/contract-service/contract/contract.service';
import { CategoryController } from './modules/master-service/category/category.controller';
import { CategoryGatewayService } from './modules/master-service/category/category.service';
import { ShipmentController } from './modules/shipment-service/shipment/shipment.controller';
import { ShipmentGatewayService } from './modules/shipment-service/shipment/shipment.service';
import { KeycloakController } from './modules/auth-service/authentication/keycloak/keycloak.controller';
import { PermissionsController } from './modules/auth-service/authentication/permissions/permissions.controller';
import { RolesController } from './modules/auth-service/authentication/roles/roles.controller';
import { PurchaseRequestController } from './modules/request-service/purchase-request/purchase-request.controller';
import { PurchaseRequestGatewayService } from './modules/request-service/purchase-request/purchase-request.service';
import { EoiController } from './modules/request-service/eoi/eoi.controller';
import { EoiGatewayService } from './modules/request-service/eoi/eoi.service';
import { RequestForQuotationController } from './modules/request-service/request-for-quotation/request-for-quotation.controller';
import { RequestForQuotationGatewayService } from './modules/request-service/request-for-quotation/request-for-quotation.service';
import { PurchaseOrderController } from './modules/request-service/purchase-order/purchase-order.controller';
import { PurchaseOrderGatewayService } from './modules/request-service/purchase-order/purchase-order.service';
import { GoodsReceiptController } from './modules/request-service/goods-receipt/goods-receipt.controller';
import { GoodsReceiptGatewayService } from './modules/request-service/goods-receipt/goods-receipt.service';
import { DepartmentController } from './modules/master-service/department/department.controller';
import { DepartmentGatewayService } from './modules/master-service/department/department.service';
 
import { TemplateController } from './modules/template/template.controller';
import { TemplateGatewayService } from './modules/template/template.service';
import { InvoiceController } from './modules/shipment-service/invoice/invoice.controller';
import { InvoiceGatewayService } from './modules/shipment-service/invoice/invoice.service';
import { RoleGatewayService } from './modules/auth-service/authentication/roles/roles.service';
import { UsersController } from './modules/user-service/users/users.controller';
import { UsersGatewayService } from './modules/user-service/users/users.service';
import { CurrencyController } from './modules/master-service/currency/currency.controller';
import { CurrencyGatewayService } from './modules/master-service/currency/currency.service';
import { CountryController } from './modules/master-service/country/country.controller';
import { CountryGatewayService } from './modules/master-service/country/country.service';
import { CityController } from './modules/master-service/city/city.controller';
import { CityGatewayService } from './modules/master-service/city/city.service';
import { CompanyController } from './modules/master-service/company/company.controller';
import { CompanyGatewayService } from './modules/master-service/company/company.service';

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
      {
        name: 'MASTER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.MASTER_SERVICE_HOST || 'localhost',
          port: Number(process.env.MASTER_SERVICE_PORT) || 3005,
        },
      },
      {
        name: 'REQUEST_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.REQUEST_SERVICE_HOST || 'localhost',
          port: Number(process.env.REQUEST_SERVICE_PORT) || 3006,
        },
      },
      {
        name: 'SHIPMENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.SHIPMENT_SERVICE_HOST || 'localhost',
          port: Number(process.env.SHIPMENT_SERVICE_PORT) || 3004,
        },
      },
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
          port: Number(process.env.CONTRACTS_SERVICE_PORT) || 3005,
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST || 'localhost',
          port: Number(process.env.USER_SERVICE_PORT) || 3007,
        },
      },
    ]),
  ],
 
  controllers: [
    AppController,
    VendorController,
    QuotationController,
    ItemController,
    ContractController,
    CategoryController,
    ShipmentController,
    KeycloakController,
    PermissionsController,
    RolesController,
    PurchaseRequestController,
    EoiController,
    RequestForQuotationController,
    PurchaseOrderController,
    GoodsReceiptController,
    DepartmentController,
    TemplateController,
    InvoiceController,
    UsersController,
    CurrencyController,
    CountryController,
    CityController,
    CompanyController,
  ],
 
  providers: [
    AppService,
    VendorGatewayService,
    QuotationGatewayService,
    ItemGatewayService,
    ContractGatewayService,
    CategoryGatewayService,
    ShipmentGatewayService,
    PurchaseRequestGatewayService,
    EoiGatewayService,
    RequestForQuotationGatewayService,
    PurchaseOrderGatewayService,
    GoodsReceiptGatewayService,
    DepartmentGatewayService,
    TemplateGatewayService,
    InvoiceGatewayService,
    RoleGatewayService,
    UsersGatewayService,
    CurrencyGatewayService,
    CountryGatewayService,
    CityGatewayService,
    CompanyGatewayService,
  ],
})
export class AppModule {
  constructor() {
 
        // ✅ Log loaded env values
    console.log('================ ENV VALUES ================');
 
    console.log('VENDOR_SERVICE_HOST =>', process.env.VENDOR_SERVICE_HOST);
    console.log('VENDOR_SERVICE_PORT =>', process.env.VENDOR_SERVICE_PORT);
 
    console.log('MASTER_SERVICE_HOST =>', process.env.MASTER_SERVICE_HOST);
    console.log('MASTER_SERVICE_PORT =>', process.env.MASTER_SERVICE_PORT);
 
    console.log('REQUEST_SERVICE_HOST =>', process.env.REQUEST_SERVICE_HOST);
    console.log('REQUEST_SERVICE_PORT =>', process.env.REQUEST_SERVICE_PORT);
 
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

    console.log('USER_SERVICE_HOST =>', process.env.USER_SERVICE_HOST);
    console.log('USER_SERVICE_PORT =>', process.env.USER_SERVICE_PORT);

  }
 }