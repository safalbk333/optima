import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import * as RolesMap from '../common/roles-map';
import { AppLogger } from '../common/logger/app.logger';
import { formatResponse, ResponseOptions } from '../common/response.helper';

@Injectable()
export class GroupRolesService {
  private readonly logger = new AppLogger(GroupRolesService.name);

  async getAllRoles() {
    try {
      // Create an object mapping role keys to their values
      const rolesObject = Object.keys(RolesMap)
        .filter((key) => key !== 'ALL_ROLES' && RolesMap[key] !== undefined)
        .reduce((acc, key) => {
          acc[key] = RolesMap[key];
          return acc;
        }, {});

      if (Object.keys(rolesObject).length === 0) {
        this.logger.error('Group roles configuration is invalid or empty');
        throw new HttpException(
          {
            success: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Group roles configuration is invalid or empty',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      this.logger.log('Group roles retrieved successfully');
      return formatResponse({
        data: rolesObject,
        message: 'Group roles retrieved successfully',
        statusCode: HttpStatus.OK,
      } as ResponseOptions<any>);
    } catch (error: any) {
      this.logger.error(`Failed to retrieve group roles: ${error.message}`);
      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to retrieve group roles',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
