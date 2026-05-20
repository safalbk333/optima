import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GroupRolesService } from './roles.service';

@Controller('Group Roles')
export class GroupRolesController {
  constructor(private readonly rolesService: GroupRolesService) {}

  @MessagePattern('authentication.roles.get-all')
  async getAllRoles() {
    return await this.rolesService.getAllRoles();
  }
}
