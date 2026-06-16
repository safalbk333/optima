import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleProperties } from '../common/properties/role.properties';
import { AppLogger } from '../common/logger/app.logger';

@Controller()
export class RolesController {
  private readonly logger = new AppLogger(RolesController.name);
  constructor(private readonly rolesService: RolesService) { }

  @MessagePattern('authentication.roles.get-all')
  async getAllRoles() {
    return await this.rolesService.getAllRoles();
  }

  @MessagePattern('role.create')
  create(@Payload() createRoleDto: CreateRoleDto) {
    this.logger.log(RoleProperties.controller.create);
    return this.rolesService.create(createRoleDto);
  }

  @MessagePattern('role.findAll')
  findAll() {
    this.logger.log(RoleProperties.controller.findAll);
    return this.rolesService.findAll();
  }

  @MessagePattern('role.findOne')
  findOne(@Payload() data: { id: string }) {
    this.logger.log(`${RoleProperties.controller.findOne}: ${data.id}`);
    return this.rolesService.findOne(data.id);
  }
}
