import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';

@Controller()
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @MessagePattern({ cmd: 'permissions.create' })
  createPermission(@Payload() dto: CreatePermissionDto) {
    return this.permissionsService.createPermission(dto.name);
  }

  @MessagePattern({ cmd: 'permissions.group.create' })
  createPermissionGroup(@Payload() dto: CreatePermissionGroupDto) {
    return this.permissionsService.createPermissionGroup(
      dto.groupName,
      dto.permissions,
    );
  }
}
