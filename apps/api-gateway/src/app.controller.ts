import {
  Controller,
  Get,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Health Check')
@Controller('health')
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('vendor-service')
  @ApiOperation({
    summary: 'Vendor-Service Health Check',
  })
  @ApiResponse({
    status: 200,
    description: 'Vendor-Service is running',
  })
  healthCheck() {
    return this.appService.healthCheckForVendorService();
  }

  @Get('contract-service')
  @ApiOperation({
    summary: 'Contract-Service Health Check',
  })
  @ApiResponse({
    status: 200,
    description: 'Contract-Service is running',
  })
  contractHealthCheck() {
    return this.appService.healthCheckForContractService();
  }

   @Get('shipment-service')
  @ApiOperation({
    summary: 'Shipment-Service Health Check',
  })
  @ApiResponse({
    status: 200,
    description: 'Shipment-Service is running',
  })
  shipmentHealthCheck() {
    return this.appService.healthCheckForShipmentService();
  }
}