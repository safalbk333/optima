import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck() {
     return {
          success: true,
    
          statusCode: HttpStatus.OK,
    
          message:
            'contract Service is running successfully',
    
          data: {
            service: 'contract-service',
    
            status: 'UP',
    
            timestamp: new Date(),
          },
        };
  }
}
