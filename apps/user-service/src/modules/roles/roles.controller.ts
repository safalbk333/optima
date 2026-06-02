import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RolesService } from './roles.service';
import { CreateJobRoleDto } from './dto/create-job-role.dto';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern({ cmd: 'roles.job.create' })
  createJobRole(@Payload() dto: CreateJobRoleDto) {
    return this.rolesService.createJobRole(dto.roleName, dto.groups);
  }
}
