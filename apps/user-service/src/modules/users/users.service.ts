import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../../libs/database/prisma-service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActivateDeactivateUserDto } from './dto/activate-deactivate-user.dto';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';
import { KeycloakService } from '../../integrations/keycloak/keycloak.service';
import { AppLogger } from '../../common/logger/app.logger';
import { UserProperties } from '../../common/properties/user.properties';

@Injectable()
export class UsersService {
  private readonly logger = new AppLogger(
    UsersService.name,
  );

  private schemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly keycloakService: KeycloakService,
  ) {}

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient =
        await this.prisma.getClient('public');
    }

    return this.schemaClient;
  }

  async findAll() {
    try {
      this.logger.log(
        UserProperties.service.findAll.start,
      );

      const prisma =
        await this.getSchemaClient();

      const arrUsers =
        await prisma.tbl_user.findMany({
          where: {
            is_delete: false,
          },
          include: {
            roles: true,
          },
        });

      this.logger.log(
        UserProperties.service.findAll.success,
      );

      return ResponseHelper.success(
        arrUsers,
        'Users fetched successfully',
      );
    } catch (error) {
      this.logger.error(
        UserProperties.service.findAll.error,
        error.stack,
      );

      return ResponseHelper.error(
        'Failed to fetch users',
        error.message,
      );
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(
        `${UserProperties.service.findOne.start}: ${id}`,
      );

      const prisma =
        await this.getSchemaClient();

      const objUser =
        await prisma.tbl_user.findUnique({
          where: {
            pk_user_id: id,
          },
          include: {
            roles: true,
          },
        });

      if (!objUser || objUser.is_delete) {
        throw new NotFoundException(
          'User not found',
        );
      }

      this.logger.log(
        `${UserProperties.service.findOne.success}: ${id}`,
      );

      return objUser;
    } catch (error) {
      this.logger.error(
        `${UserProperties.service.findOne.error}: ${id}`,
        error.stack,
      );

      throw error;
    }
  }

  async create(dto: CreateUserDto) {
    try {
      this.logger.log(
        UserProperties.service.create.start,
      );

      const prisma =
        await this.getSchemaClient();

      const token =
        await this.keycloakService.getToken();

      const keycloakPayload: any = {
        username: dto.userName,
        email: dto.userEmail,
        enabled: true,
        credentials: [
          {
            type: 'password',
            value: dto.password,
            temporary: true,
          },
        ],
      };

      if (dto.schemaId) {
        keycloakPayload.attributes = {
          'schema-id': [dto.schemaId],
        };
      }

      const keycloakUserId =
        await this.keycloakService.createUser(
          token,
          keycloakPayload,
        );

      const createData: any = {
        keycloak_id: keycloakUserId,
        user_name: dto.userName,
        user_email: dto.userEmail,
        user_phone: dto.userPhone,
        role_id: dto.fkRoleId,
      };

      if (dto.fkCompanyId) {
        createData.fk_company_id =
          dto.fkCompanyId;
      }

      const objUser =
        await prisma.tbl_user.create({
          data: createData,
        });

      this.logger.log(
        `${UserProperties.service.create.success}: ${objUser.pk_user_id}`,
      );

      return ResponseHelper.success(
        objUser,
        'User created successfully',
      );
    } catch (error) {
      this.logger.error(
        UserProperties.service.create.error,
        error.stack,
      );

      return ResponseHelper.error(
        'Failed to create user',
        error.message,
      );
    }
  }

  async update(
    id: string,
    dto: UpdateUserDto,
  ) {
    try {
      this.logger.log(
        `${UserProperties.service.update.start}: ${id}`,
      );

      const prisma =
        await this.getSchemaClient();

      const existing =
        await prisma.tbl_user.findUnique({
          where: {
            pk_user_id: id,
          },
        });

      if (!existing || existing.is_delete) {
        throw new NotFoundException(
          'User not found',
        );
      }

      if (
        dto.password ||
        dto.userEmail
      ) {
        const token =
          await this.keycloakService.getToken();

        const keycloakUpdatePayload: any =
          {};

        if (dto.userEmail) {
          keycloakUpdatePayload.email =
            dto.userEmail;
        }

        if (dto.password) {
          keycloakUpdatePayload.credentials =
            [
              {
                type: 'password',
                value: dto.password,
                temporary: false,
              },
            ];
        }

        await this.keycloakService.updateUser(
          token,
          existing.keycloak_id,
          keycloakUpdatePayload,
        );
      }

      const updateData: any = {};

      if (dto.userName !== undefined)
        updateData.user_name =
          dto.userName;

      if (dto.userEmail !== undefined)
        updateData.user_email =
          dto.userEmail;

      if (dto.userPhone !== undefined)
        updateData.user_phone =
          dto.userPhone;

      if (dto.fkCompanyId !== undefined)
        updateData.fk_company_id =
          dto.fkCompanyId;

      if (dto.isActive !== undefined)
        updateData.is_active =
          dto.isActive;

      if (dto.fkRoleId !== undefined)
        updateData.role_id =
          dto.fkRoleId;

      updateData.modified =
        new Date();

      const objUser =
        await prisma.tbl_user.update({
          where: {
            pk_user_id: id,
          },
          data: updateData,
        });

      this.logger.log(
        `${UserProperties.service.update.success}: ${id}`,
      );

      return ResponseHelper.success(
        objUser,
        'User updated successfully',
      );
    } catch (error) {
      this.logger.error(
        `${UserProperties.service.update.error}: ${id}`,
        error.stack,
      );

      return ResponseHelper.error(
        'Failed to update user',
        error.message,
      );
    }
  }

  async delete(id: string) {
    try {
      this.logger.log(
        `${UserProperties.service.delete.start}: ${id}`,
      );

      const prisma =
        await this.getSchemaClient();

      const existing =
        await prisma.tbl_user.findUnique({
          where: {
            pk_user_id: id,
          },
        });

      if (!existing || existing.is_delete) {
        throw new NotFoundException(
          'User not found',
        );
      }

      const token =
        await this.keycloakService.getToken();

      await this.keycloakService.disableUser(
        token,
        existing.keycloak_id,
      );

      const objUser =
        await prisma.tbl_user.update({
          where: {
            pk_user_id: id,
          },
          data: {
            is_delete: true,
            is_active: false,
            modified: new Date(),
          },
        });

      this.logger.log(
        `${UserProperties.service.delete.success}: ${id}`,
      );

      return ResponseHelper.success(
        objUser,
        'User deleted successfully',
      );
    } catch (error) {
      this.logger.error(
        `${UserProperties.service.delete.error}: ${id}`,
        error.stack,
      );

      return ResponseHelper.error(
        'Failed to delete user',
        error.message,
      );
    }
  }

  async activateDeactivate(
    id: string,
    dto: ActivateDeactivateUserDto,
  ) {
    try {
      const prisma =
        await this.getSchemaClient();

      const existing =
        await prisma.tbl_user.findUnique({
          where: {
            pk_user_id: id,
          },
        });

      if (!existing || existing.is_delete) {
        throw new NotFoundException(
          'User not found',
        );
      }

      const token =
        await this.keycloakService.getToken();

      await this.keycloakService.updateUser(
        token,
        existing.keycloak_id,
        {
          enabled: dto.isActive,
        },
      );

      const objUser =
        await prisma.tbl_user.update({
          where: {
            pk_user_id: id,
          },
          data: {
            is_active:
              dto.isActive,
            modified:
              new Date(),
          },
        });

      return ResponseHelper.success(
        objUser,
        `User ${
          dto.isActive
            ? 'activated'
            : 'deactivated'
        } successfully`,
      );
    } catch (error) {
      this.logger.error(
        `${UserProperties.service.activateDeactivate.error}: ${id}`,
        error.stack,
      );

      return ResponseHelper.error(
        'Failed to activate/deactivate user',
        error.message,
      );
    }
  }
}
