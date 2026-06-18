import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { DeletePermissionDto } from './dto/delete-permission.dto';

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
}