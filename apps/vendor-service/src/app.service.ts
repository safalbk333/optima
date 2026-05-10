import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
   healthCheck() {
    return {
      success: true,

      statusCode: HttpStatus.OK,

      message:
        'Vendor Service is running successfully',

      data: {
        service: 'vendor-service',

        status: 'UP',

        timestamp: new Date(),
      },
    };
  }
}