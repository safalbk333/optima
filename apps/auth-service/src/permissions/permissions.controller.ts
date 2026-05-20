import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @MessagePattern('authentication.permissions.get-all')
  async getAllPermissions() {
    return await this.permissionsService.getAllPermissions();
  }
}
