import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DepartmentGatewayService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentGatewayService: DepartmentGatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  @ApiResponse({ status: 200, description: 'Department created successfully' })
  @ApiBody({ type: CreateDepartmentDto })
  create(@Body() data: CreateDepartmentDto) {
    return this.departmentGatewayService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all departments' })
  @ApiResponse({ status: 200, description: 'Department list fetched successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search by name or code' })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.departmentGatewayService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get department by id' })
  @ApiResponse({ status: 200, description: 'Department fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.departmentGatewayService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update department' })
  @ApiResponse({ status: 200, description: 'Department updated successfully' })
  @ApiBody({ type: UpdateDepartmentDto })
  update(@Param('id') id: string, @Body() data: UpdateDepartmentDto) {
    return this.departmentGatewayService.update(id, data);
  }
}
