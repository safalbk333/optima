import { Injectable, HttpStatus, HttpException, NotFoundException } from '@nestjs/common';
import * as RolesMap from '../common/roles-map';
import { AppLogger } from '../common/logger/app.logger';
import { formatResponse, ResponseOptions } from '../common/response.helper';
import { CreateRoleDto } from './dto/create-role.dto';
import { PrismaService } from 'libs/database/prisma-service';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';
import { RoleProperties } from '../common/properties/role.properties';

@Injectable()
export class RolesService {
  private readonly logger = new AppLogger(RolesService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async getAllRoles() {
    try {
      // Create an object mapping role keys to their values
      const rolesObject = Object.keys(RolesMap)
        .filter((key) => key !== 'ALL_ROLES' && RolesMap[key] !== undefined)
        .reduce((acc, key) => {
          acc[key] = RolesMap[key];
          return acc;
        }, {});

      if (Object.keys(rolesObject).length === 0) {
        this.logger.error('Group roles configuration is invalid or empty');
        throw new HttpException(
          {
            success: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Group roles configuration is invalid or empty',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      this.logger.log('Group roles retrieved successfully');
      return formatResponse({
        data: rolesObject,
        message: 'Group roles retrieved successfully',
        statusCode: HttpStatus.OK,
      } as ResponseOptions<any>);
    } catch (error: any) {
      this.logger.error(`Failed to retrieve group roles: ${error.message}`);
      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to retrieve group roles',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createRoleDto: CreateRoleDto) {
    const role =
      await this.prisma.tbl_user_role.create({
        data: {
          role_name: createRoleDto.role_name,
          role_code: createRoleDto.role_code,
          description: createRoleDto.description,
        },
      });

    return ResponseHelper.success(
      role,
      'Role created successfully',
    );
  }

  async findOne(role_id: string) {
    const role =
      await this.prisma.tbl_user_role.findUnique({
        where: {
          pk_role_id: role_id,
        },
      });
  
    if (!role) {
      throw new NotFoundException(
        'Role not found',
      );
    }
    return ResponseHelper.success(
      role,
      'Role fetched successfully',
    );
  }

  async findAll() {
      try {
        this.logger.log(RoleProperties.service.findAll.start);
        const roles = await this.prisma.tbl_user_role.findMany();
        this.logger.log(RoleProperties.service.findAll.success);
        return ResponseHelper.success(
          roles,
          'Roles fetched successfully',
        );
      } catch (error) {
        this.logger.error(
          RoleProperties.service.findAll.error,
          error.stack,
        );
        return ResponseHelper.error(
          'Failed to fetch vendors',
          error.message,
        );
      }
    }
}
