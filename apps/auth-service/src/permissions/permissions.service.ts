import { Injectable, HttpStatus } from '@nestjs/common';
import * as PermissionsMap from '../common/permissions-map';
import { AppLogger } from '../common/logger/app.logger';
import { formatResponse, ResponseOptions } from '../common/response.helper';
import { PermissionUtil } from './util/permission.util';
import { CreatePermissionDto } from './dto/create-permission.dto';

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
  async createPermission(permission: CreatePermissionDto) {
    try {
        // this.logger.log(permission);

      const config = PermissionUtil.getConfig(permission.origin, permission.client);

      const token = await PermissionUtil.getClientToken(config);
      // const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIydTYwS3R3RjQwcGR3UUhmWHU4UVpqTkpydkNxOGozRU5Hb09CZ29ZTXdVIn0.eyJleHAiOjE3ODE2OTcxMzMsImlhdCI6MTc4MTY5NjgzMywianRpIjoiMmRiODU5ZGEtYTllNS00ZTNmLTg5YjItNDcwMWRmMWQyM2Y4IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9vcHRpbWEiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiYzgyMmEzZmQtNGY1OS00N2M4LWI0MWUtZTQxN2ZiOTVmMGY3IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYXV0aC1jbGllbnQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1vcHRpbWEiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhdXRoLWNsaWVudCI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwibWFuYWdlLXJlYWxtIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS1ncm91cHMiLCJxdWVyeS11c2VycyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRIb3N0IjoiMTcyLjE4LjAuMSIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1hdXRoLWNsaWVudCIsImNsaWVudEFkZHJlc3MiOiIxNzIuMTguMC4xIiwiY2xpZW50X2lkIjoiYXV0aC1jbGllbnQifQ.kxLX9eaNfrla9jotD0b8wAvg7x_ylH0YZeLc_3TrhdHW8ZvSrG9a3Tzn-4ICr36LDqJFW0niMh6uESY3B8pdn8a4k1a4xkFCDcwN01GPOdiXcpbJ23668YrrDL43LTiNNvKUGl590q_ubxdPU_h86L2e89TDrz0nqf4_cJXEDb9_GxDMn-z88rQ8Nc7Ybq-76kdT5xrAeDa3qwdUdeRpQeoigttIm14py4VG3qgTa-98SJR33CpUCcOhPY5L-z1ku1XXB2S0Di17PGDm8bBa2sG9MvPHgULPZLDyh7RP0lPBS1kqj_b32ufvVUlhmx6psM3fI0Sg6gnXtnPD0vk8nw"

      const url = `${config.keycloakUrl}/admin/realms/${config.realmName}/roles`;
  this.logger.log(url);

      await PermissionUtil.getAxiosInstance().post(
        url,
        {
          name: permission.permissionName,
          description: permission.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      this.logger.log(
        `Permission ${permission.permissionName} created successfully`,
      );

      return formatResponse({
        data: permission,
        message: 'Permission created successfully',
        statusCode: HttpStatus.CREATED,
      });

    }
    catch (error: any) {
      this.logger.error(
        `Failed to create permission: ${error.response?.data?.error_description || error.message
        }`,
      );

      throw new Error(
        error.response?.data?.error_description ||
        error.message ||
        'Failed to create permission',
      );
    }
  }

}
