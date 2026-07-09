import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CacheService } from 'libs/database/cache.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentProperties } from '../../common/properties/department.properties';
import { AppLogger } from '../../common/logger/app.logger';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

const CACHE_KEYS = {
  all: (strSchemaId: string) => `${strSchemaId}:department:all`,
  one: (strSchemaId: string, strId: string) => `${strSchemaId}:department:${strId}`,
};

@Injectable()
export class DepartmentService {
  private readonly logger = new AppLogger(DepartmentService.name);
  private objSchemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  private async getSchemaClient() {
    if (!this.objSchemaClient) {
      this.objSchemaClient = await this.prisma.getClient('public');
    }
    return this.objSchemaClient;
  }

  async create(strSchemaId: string, dto: CreateDepartmentDto) {
    try {
      this.logger.log(DepartmentProperties.service.create.start);
      const objPrisma = await this.getSchemaClient();

      const objDepartment = await objPrisma.tbl_department.create({
        data: {
          department_name: dto.departmentName,
          department_code: dto.departmentCode,
          description: dto.description,
        },
      });

      this.logger.log(`${DepartmentProperties.service.create.success}: ${objDepartment.pk_department_id}`);
      await this.cache.del(CACHE_KEYS.all(strSchemaId));
      return ResponseHelper.success(objDepartment, 'Department created successfully');
    } catch (error) {
      this.logger.error(DepartmentProperties.service.create.error, error.stack);
      return ResponseHelper.error('Failed to create department', error.message);
    }
  }

  async findAll(strSchemaId: string, payload: { limit?: number; page?: number; search?: string }) {
    try {
      this.logger.log(DepartmentProperties.service.findAll.start);

      const page = !isNaN(Number(payload?.page)) && Number(payload?.page) > 0 ? Number(payload.page) : 1;
      const limit = !isNaN(Number(payload?.limit)) && Number(payload?.limit) > 0 ? Number(payload.limit) : 10;

      const whereClause: any = { is_active: true, is_delete: false };
      if (payload?.search) {
        whereClause.OR = [
          { department_name: { contains: payload.search, mode: 'insensitive' } },
          { department_code: { contains: payload.search, mode: 'insensitive' } },
        ];
      }

      const arrDepartments = await this.cache.getOrSet(
        CACHE_KEYS.all(strSchemaId),
        async () => {
          this.logger.log('[DB Fallback] Fetching all departments from database');
          const objPrisma = await this.getSchemaClient();
          return objPrisma.tbl_department.findMany({
            where: whereClause,
            skip: (page - 1) * limit,
            take: limit,
          });
        },
      );

      const objPrisma = await this.getSchemaClient();
      const total = await objPrisma.tbl_department.count({ where: whereClause });

      this.logger.log(DepartmentProperties.service.findAll.success);
      return ResponseHelper.success(
        { departments: arrDepartments, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } },
        'Departments fetched successfully',
      );
    } catch (error) {
      this.logger.error(DepartmentProperties.service.findAll.error, error.stack);
      return ResponseHelper.error('Failed to fetch departments', error.message);
    }
  }

  async findOne(strSchemaId: string, strId: string) {
    try {
      this.logger.log(`${DepartmentProperties.service.findOne.start}: ${strId}`);

      const objDepartment = await this.cache.getOrSet(
        CACHE_KEYS.one(strSchemaId, strId),
        async () => {
          this.logger.log(`[DB Fallback] Fetching department ${strId} from database`);
          const objPrisma = await this.getSchemaClient();
          return objPrisma.tbl_department.findUnique({
            where: { pk_department_id: strId, is_active: true, is_delete: false },
          });
        },
      );

      if (!objDepartment) throw new NotFoundException('Department not found');

      this.logger.log(`${DepartmentProperties.service.findOne.success}: ${strId}`);
      return ResponseHelper.success(objDepartment, 'Department fetched successfully');
    } catch (error) {
      this.logger.error(`${DepartmentProperties.service.findOne.error}: ${strId}`, error.stack);
      throw error;
    }
  }

  async update(strSchemaId: string, strId: string, dto: UpdateDepartmentDto) {
    try {
      this.logger.log(`${DepartmentProperties.service.update.start}: ${strId}`);
      const objPrisma = await this.getSchemaClient();

      const objExisting = await objPrisma.tbl_department.findUnique({
        where: { pk_department_id: strId, is_active: true, is_delete: false },
      });

      if (!objExisting) throw new BadRequestException('Department not found');

      const objUpdatedDepartment = await objPrisma.tbl_department.update({
        where: { pk_department_id: strId },
        data: {
          department_name: dto.departmentName,
          department_code: dto.departmentCode,
          description: dto.description,
          is_active: dto.isActive,
          modified: new Date(),
        },
      });

      this.logger.log(`${DepartmentProperties.service.update.success}: ${strId}`);
      await this.cache.update(
        CACHE_KEYS.one(strSchemaId, strId),
        objUpdatedDepartment,
        CACHE_KEYS.all(strSchemaId),
      );
      return ResponseHelper.success(objUpdatedDepartment, 'Department updated successfully');
    } catch (error) {
      this.logger.error(`${DepartmentProperties.service.update.error}: ${strId}`, error.stack);
      throw error;
    }
  }
}
