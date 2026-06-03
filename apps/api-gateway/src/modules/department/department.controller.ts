import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DepartmentGatewayService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentGatewayService: DepartmentGatewayService) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new department',
  })
  @ApiResponse({
    status: 200,
    description:
      'Department created successfully',
  })
  create(@Body() data: CreateDepartmentDto) {
    return this.departmentGatewayService.create(data);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get department by id',
  })
  @ApiResponse({
    status: 200,
    description:
      'Department fetched successfully',
  })
  findOne(@Param('id') id: string) {
    return this.departmentGatewayService.findOne(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all departments',
  })
  @ApiResponse({
    status: 200,
    description:
      'Department list fetched successfully',
  })
  findAll() {
    return this.departmentGatewayService.findAll();
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update department',
  })
  @ApiResponse({
    status: 200,
    description:
      'Department updated successfully',
  })
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentGatewayService.update(id, updateDepartmentDto);
  }
}
