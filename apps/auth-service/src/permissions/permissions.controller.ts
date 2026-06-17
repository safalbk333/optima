import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';

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
  

}