import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from ".././../../../../libs/database/prisma-service";
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentProperties } from '../../common/properties/department.properties';
import { AppLogger } from '../../common/logger/app.logger';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

@Injectable()
export class DepartmentService {
  private readonly logger = new AppLogger(DepartmentService.name);

  constructor(private readonly prisma: PrismaService) { }
  
  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      this.logger.log(DepartmentProperties.service.create.start);
      const objDepartment = await this.prisma.tbl_department.create({
        data: {
          chr_department_name: createDepartmentDto.departmentName,
          chr_department_code: createDepartmentDto.departmentCode,
          txt_description: createDepartmentDto.description,
        },
      });
      this.logger.log(`${DepartmentProperties.service.create.success}: ${objDepartment.pk_chr_department_id}`);
      return objDepartment;
    } catch (error) {
      this.logger.error(
        DepartmentProperties.service.create.error,
        error.stack,
      );
      throw error;
    }
  }

  async findAll() {
    try {
      this.logger.log(DepartmentProperties.service.findAll.start);
      const arrDepartments = await this.prisma.tbl_department.findMany({
        where: {
          bln_is_active: true,
        },
      });

      this.logger.log(DepartmentProperties.service.findAll.success);
      return ResponseHelper.success(
        arrDepartments,
        "Departments fetched successfully",
      );
    } catch (error) {
      this.logger.error(
        DepartmentProperties.service.findAll.error,
        error.stack,
      );
      return ResponseHelper.error("Failed to fetch departments", error.message);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`${DepartmentProperties.service.findOne.start}: ${id}`);
      const objDepartment = await this.prisma.tbl_department.findUnique({
        where: { pk_chr_department_id: id },
      });

      if (!objDepartment) {
        throw new NotFoundException("Department not found");
      }

      this.logger.log(`${DepartmentProperties.service.findOne.success}: ${id}`);
      return objDepartment;
    } catch (error) {
      this.logger.error(
        `${DepartmentProperties.service.findOne.error}: ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      this.logger.log(`${DepartmentProperties.service.update.start}: ${id}`);
      const objDepartment = await this.prisma.tbl_department.update({
        where: { pk_chr_department_id: id },
        data: {
          chr_department_name: updateDepartmentDto.departmentName,
          chr_department_code: updateDepartmentDto.departmentCode,
          txt_description: updateDepartmentDto.description,
        },
      });

      this.logger.log(`${DepartmentProperties.service.update.success}: ${id}`);
      return objDepartment;
    } catch (error) {
      this.logger.error(
        `${DepartmentProperties.service.update.error}: ${id}`,
        error.stack,
      );
      throw error;
    }
  }
}
