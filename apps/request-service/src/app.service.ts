import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
   healthCheck() {
    return {
      success: true,

      statusCode: HttpStatus.OK,

      message:
        'Request Service is running successfully',

      data: {
        service: 'request-service',

        status: 'UP',

        timestamp: new Date(),
      },
    };
  }
}
