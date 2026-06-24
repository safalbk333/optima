import { Injectable, HttpStatus } from '@nestjs/common';
import * as PermissionsMap from '../common/permissions-map';
import { AppLogger } from '../common/logger/app.logger';
import { formatResponse, ResponseOptions } from '../common/response.helper';
import { PermissionUtil } from './util/permission.util';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { DeletePermissionDto } from './dto/delete-permission.dto';
import { AssignRoleDto } from './dto/assign-role-permission.dto.';

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
      const config = PermissionUtil.getConfig(
        permission.origin,
        permission.client,
      );

      await PermissionUtil.createPermission(
        config,
        permission.permissionName,
        permission.description,
        false,
      );

      return formatResponse({
        data: permission,
        message: 'Permission created successfully',
        statusCode: HttpStatus.CREATED,
      });
    } catch (error: any) {
      throw error;
    }
  }

  async updatePermission(
    permission: UpdatePermissionDto,
  ) {
    try {
      const config = PermissionUtil.getConfig(
        permission.origin,
        permission.client,
      );

      await PermissionUtil.updatePermission(
        config,
        permission.currentPermissionName,
        permission.permissionName,
        permission.description,
      );

      return formatResponse({
        data: permission,
        message: 'Permission updated successfully',
        statusCode: HttpStatus.OK,
      });
    } catch (error: any) {
      throw error;
    }
  }

  async deletePermission(
    permission: DeletePermissionDto,
  ) {
    try {
      const config = PermissionUtil.getConfig(
        permission.origin,
        permission.client,
      );

      await PermissionUtil.deletePermission(
        config,
        permission.permissionName,
      );

      return formatResponse({
        data: null,
        message: 'Permission deleted successfully',
        statusCode: HttpStatus.OK,
      });
    } catch (error: any) {
      throw error;
    }
  }

  async assignRole(dto: AssignRoleDto) {
    try {

      const config = PermissionUtil.getConfig(
        dto.origin,
        dto.client,
      );


      await PermissionUtil.assignRealmRoleToUser(
        config,
        dto.userId,
        dto.roleName,
      );

      return formatResponse({
        data: null,
        message: 'Role assigned successfully',
        statusCode: HttpStatus.OK,
      });
    } catch (error: any) {
      this.logger.error(
        `Failed to assign role: ${error.message}`,
      );
      throw error;
    }
  }

  async removeRole(dto: AssignRoleDto) {
    try {
      const config = PermissionUtil.getConfig(
        dto.origin,
        dto.client,
      );

      await PermissionUtil.removeRealmRoleFromUser(
        config,
        dto.userId,
        dto.roleName,
      );

      return formatResponse({
        data: null,
        message: 'Role removed successfully',
        statusCode: HttpStatus.OK,
      });
    } catch (error: any) {
      this.logger.error(
        `Failed to remove role: ${error.message}`,
      );
      throw error;
    }
  }

  async getUserRoles(
    userId: string,
    origin: string,
    client: string,
  ) {
    try {
      const config = PermissionUtil.getConfig(
        origin,
        client,
      );

      const roles = await PermissionUtil.getUserRealmRoles(
        config,
        userId,
      );

      return formatResponse({
        data: roles,
        message: 'User roles retrieved successfully',
        statusCode: HttpStatus.OK,
      });
    } catch (error: any) {
      this.logger.error(
        `Failed to retrieve user roles: ${error.message}`,
      );
      throw error;
    }
  }


}
