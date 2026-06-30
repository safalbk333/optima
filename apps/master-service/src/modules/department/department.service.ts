import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentProperties } from '../../common/properties/department.properties';
import { AppLogger } from '../../common/logger/app.logger';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

@Injectable()
export class DepartmentService {
  private readonly logger = new AppLogger(DepartmentService.name);
  private schemaClient: any;

  constructor(private readonly prisma: PrismaService) {}

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient = await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  async create(dto: CreateDepartmentDto) {
    try {
      this.logger.log(DepartmentProperties.service.create.start);
      const prisma = await this.getSchemaClient();

      const department = await prisma.tbl_department.create({
        data: {
          department_name: dto.departmentName,
          department_code: dto.departmentCode,
          description: dto.description,
        },
      });

      this.logger.log(`${DepartmentProperties.service.create.success}: ${department.pk_department_id}`);
      return ResponseHelper.success(department, 'Department created successfully');
    } catch (error) {
      this.logger.error(DepartmentProperties.service.create.error, error.stack);
      return ResponseHelper.error('Failed to create department', error.message);
    }
  }

  async findAll(payload: { limit?: number; page?: number; search?: string }) {
    try {
      this.logger.log(DepartmentProperties.service.findAll.start);
      const prisma = await this.getSchemaClient();

      const page = !isNaN(Number(payload?.page)) && Number(payload?.page) > 0 ? Number(payload.page) : 1;
      const limit = !isNaN(Number(payload?.limit)) && Number(payload?.limit) > 0 ? Number(payload.limit) : 10;

      const whereClause: any = { is_active: true, is_delete: false };

      if (payload?.search) {
        whereClause.OR = [
          { department_name: { contains: payload.search, mode: 'insensitive' } },
          { department_code: { contains: payload.search, mode: 'insensitive' } },
        ];
      }

      const departments = await prisma.tbl_department.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
      });

      const total = await prisma.tbl_department.count({ where: whereClause });

      this.logger.log(DepartmentProperties.service.findAll.success);
      return ResponseHelper.success(
        {
          departments,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
        'Departments fetched successfully',
      );
    } catch (error) {
      this.logger.error(DepartmentProperties.service.findAll.error, error.stack);
      return ResponseHelper.error('Failed to fetch departments', error.message);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`${DepartmentProperties.service.findOne.start}: ${id}`);
      const prisma = await this.getSchemaClient();

      const department = await prisma.tbl_department.findUnique({
        where: { pk_department_id: id, is_active: true, is_delete: false },
      });

      if (!department) {
        throw new NotFoundException('Department not found');
      }

      this.logger.log(`${DepartmentProperties.service.findOne.success}: ${id}`);
      return ResponseHelper.success(department, 'Department fetched successfully');
    } catch (error) {
      this.logger.error(`${DepartmentProperties.service.findOne.error}: ${id}`, error.stack);
      throw error;
    }
  }

  async update(id: string, dto: UpdateDepartmentDto) {
    try {
      this.logger.log(`${DepartmentProperties.service.update.start}: ${id}`);
      const prisma = await this.getSchemaClient();

      const existing = await prisma.tbl_department.findUnique({
        where: { pk_department_id: id, is_active: true, is_delete: false },
      });

      if (!existing) {
        throw new BadRequestException('Department not found');
      }

      const department = await prisma.tbl_department.update({
        where: { pk_department_id: id },
        data: {
          department_name: dto.departmentName,
          department_code: dto.departmentCode,
          description: dto.description,
          is_active: dto.isActive,
          modified: new Date(),
        },
      });

      this.logger.log(`${DepartmentProperties.service.update.success}: ${id}`);
      return ResponseHelper.success(department, 'Department updated successfully');
    } catch (error) {
      this.logger.error(`${DepartmentProperties.service.update.error}: ${id}`, error.stack);
      throw error;
    }
  }
}
