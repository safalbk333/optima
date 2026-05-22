import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
   shipmentHealthCheck() {
    return {
      success: true,
      statusCode: HttpStatus.OK,
      message:
        'Shipment Service is running successfully',
      data: {
        service: 'shipment-service',
        status: 'UP',
        timestamp: new Date(),
      },
    };
  }
}