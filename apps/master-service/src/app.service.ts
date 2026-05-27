import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
   healthCheck() {
    return {
      success: true,

      statusCode: HttpStatus.OK,

      message:
        'Master Service is running successfully',

      data: {
        service: 'master-service',

        status: 'UP',

        timestamp: new Date(),
      },
    };
  }
}
