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
}