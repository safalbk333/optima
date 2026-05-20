import { Injectable, HttpStatus } from '@nestjs/common';
import * as PermissionsMap from '../common/permissions-map';
import { AppLogger } from '../common/logger/app.logger';
import { formatResponse, ResponseOptions } from '../common/response.helper';

@Injectable()
export class PermissionsService {
  private readonly logger = new AppLogger(PermissionsService.name);

  async getAllPermissions() {
    try {
      // Create an object mapping permission keys to their values
      const permissionsObject = Object.keys(PermissionsMap)
        .filter(
          (key) =>
            key !== 'ALL_PERMISSIONS' && PermissionsMap[key] !== undefined,
        )
        .reduce((acc, key) => {
          acc[key] = PermissionsMap[key];
          return acc;
        }, {});

      if (Object.keys(permissionsObject).length === 0) {
        this.logger.error('Permissions configuration is invalid or empty');
        throw new Error('Permissions configuration is invalid or empty.');
      }

      this.logger.log('Permissions retrieved successfully');
      return formatResponse({
        data: permissionsObject,
        message: 'Permissions retrieved successfully',
        statusCode: HttpStatus.OK,
      } as ResponseOptions<any>);
    } catch (error: any) {
      this.logger.error(`Failed to retrieve permissions: ${error.message}`);
      throw new Error(error.message || 'Failed to retrieve permissions');
    }
  }
}
