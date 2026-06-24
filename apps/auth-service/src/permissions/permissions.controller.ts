import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { DeletePermissionDto } from './dto/delete-permission.dto';
import { AssignRoleDto } from './dto/assign-role-permission.dto.';
import { GetUserRolesDto } from './dto/get-user-roles.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @MessagePattern('authentication.permissions.get-all')
  async getAllPermissions() {
    return await this.permissionsService.getAllPermissions();
  }


  @MessagePattern('authentication.permissions.create')
  async createPermission(permission: CreatePermissionDto) {
    return await this.permissionsService.createPermission(permission);
  }

  @MessagePattern('authentication.permissions.update')
  async updatePermission(
    permission: UpdatePermissionDto,
  ) {
    return await this.permissionsService.updatePermission(
      permission,
    );
  }

  @MessagePattern('authentication.permissions.delete')
  async deletePermission(
    permission: DeletePermissionDto,
  ) {
    return await this.permissionsService.deletePermission(
      permission,
    );
  }

    @MessagePattern('authentication.permissions.assign-role')
  async assignRole(
    dto: AssignRoleDto,
  ) {
    return await this.permissionsService.assignRole(
      dto,
    );
  }

  @MessagePattern('authentication.permissions.remove-role')
  async removeRole(
    dto: AssignRoleDto,
  ) {
    return await this.permissionsService.removeRole(
      dto,
    );
  }

  @MessagePattern('authentication.permissions.user-roles')
  async getUserRoles(
    dto: GetUserRolesDto
,
  ) {
    return await this.permissionsService.getUserRoles(
      dto.userId,
      dto.origin,
      dto.client,
    );
  }

}