import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentProperties } from '../../common/properties/department.properties';
import { AppLogger } from '../../common/logger/app.logger';

@Controller()
export class DepartmentController {
  private readonly logger = new AppLogger(DepartmentController.name);

  constructor(private readonly departmentService: DepartmentService) {
    this.logger.log(DepartmentProperties.controller.start);
  }

  @MessagePattern('department.create')
  create(@Payload() payload: { schemaId: string; data: CreateDepartmentDto }) {
    this.logger.log(DepartmentProperties.controller.create);
    return this.departmentService.create(payload.schemaId, payload.data);
  }

  @MessagePattern('department.findAll')
  findAll(@Payload() payload: { schemaId: string; limit?: number; page?: number; search?: string }) {
    this.logger.log(DepartmentProperties.controller.findAll);
    return this.departmentService.findAll(payload.schemaId, payload);
  }

  @MessagePattern('department.findOne')
  findOne(@Payload() payload: { schemaId: string; id: string }) {
    this.logger.log(`${DepartmentProperties.controller.findOne}: ${payload.id}`);
    return this.departmentService.findOne(payload.schemaId, payload.id);
  }

  @MessagePattern('department.update')
  update(@Payload() payload: { schemaId: string; id: string; data: UpdateDepartmentDto }) {
    this.logger.log(`${DepartmentProperties.controller.update}: ${payload.id}`);
    return this.departmentService.update(payload.schemaId, payload.id, payload.data);
  }
}
