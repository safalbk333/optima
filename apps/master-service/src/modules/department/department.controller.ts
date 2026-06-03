import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentProperties } from '../../common/properties/department.properties';
import { AppLogger } from '../../common/logger/app.logger';

@Controller()
export class DepartmentController {
  private readonly logger = new AppLogger(DepartmentController.name);
  constructor(
    private readonly departmentService: DepartmentService,
  ) {
    this.logger.log(DepartmentProperties.controller.start);
  }

  @MessagePattern('department.create')
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @MessagePattern('department.findAll')
  findAll() {
    return this.departmentService.findAll();
  }

  @MessagePattern('department.findOne')
  findOne(
    @Payload() data: { id: string },
  ) {
    return this.departmentService.findOne(
      data.id,
    );
  }

  @MessagePattern('department.update')
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(id, updateDepartmentDto);
  }
}
