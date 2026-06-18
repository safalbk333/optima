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
  private readonly logger = new AppLogger(UsersService.name);
  
  constructor(
    private readonly prisma: PrismaService,
    private readonly keycloakService: KeycloakService,
  ) {}

  async findAll() {
    try {
      this.logger.log(UserProperties.service.findAll.start);
      const arrUsers = await this.prisma.tbl_user.findMany({
        where: { is_delete: false },
      });
      this.logger.log(UserProperties.service.findAll.success);
      return ResponseHelper.success(arrUsers, 'Users fetched successfully');
    } catch (error) {
      this.logger.error(UserProperties.service.findAll.error, error.stack);
      return ResponseHelper.error('Failed to fetch users', error.message);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`${UserProperties.service.findOne.start}: ${id}`);
      const objUser = await this.prisma.tbl_user.findUnique({
        where: { pk_user_id: id },
      });
      if (!objUser || objUser.is_delete) {
        throw new NotFoundException('User not found');
      }
      this.logger.log(`${UserProperties.service.findOne.success}: ${id}`);
      return objUser;
    } catch (error) {
      this.logger.error(`${UserProperties.service.findOne.error}: ${id}`, error.stack);
      throw error;
    }
  }

  async create(dto: CreateUserDto) {
    try {
      this.logger.log(UserProperties.service.create.start);
      
      // Get Keycloak access token
      this.logger.log(UserProperties.service.create.keycloakStart);
      const token = await this.keycloakService.getToken();

      // Prepare Keycloak user payload
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

      // Add schema-id attribute if provided
      if (dto.schemaId) {
        keycloakPayload.attributes = {
          'schema-id': [dto.schemaId],
        };
      }

      // Create user in Keycloak
      const keycloakUserId = await this.keycloakService.createUser(
        token,
        keycloakPayload,
      );
      this.logger.log(`${UserProperties.service.create.keycloakSuccess}: ${keycloakUserId}`);

      // Create user in database with Keycloak user ID as primary key
      this.logger.log(UserProperties.service.create.dbStart);
      const createData: any = {
        pk_user_id: keycloakUserId,
        user_name: dto.userName,
        user_email: dto.userEmail,
        user_phone: dto.userPhone,
      };

      if (dto.fkCompanyId) {
        createData.fk_company_id = dto.fkCompanyId;
      }

      const objUser = await this.prisma.tbl_user.create({
        data: createData,
      });

      this.logger.log(`${UserProperties.service.create.success}: ${objUser.pk_user_id}`);
      return ResponseHelper.success(objUser, 'User created successfully');
    } catch (error) {
      this.logger.error(UserProperties.service.create.error, error.stack);
      return ResponseHelper.error('Failed to create user', error.message);
    }
  }

  async update(id: string, dto: UpdateUserDto) {
    try {
      this.logger.log(`${UserProperties.service.update.start}: ${id}`);
      const existing = await this.prisma.tbl_user.findUnique({
        where: { pk_user_id: id },
      });
      if (!existing || existing.is_delete) {
        throw new NotFoundException('User not found');
      }

      // Update Keycloak user if password or email is changed
      if (dto.password || dto.userEmail) {
        this.logger.log(UserProperties.service.update.keycloakStart);
        const token = await this.keycloakService.getToken();
        const keycloakUpdatePayload: any = {};

        if (dto.userEmail) {
          keycloakUpdatePayload.email = dto.userEmail;
        }

        if (dto.password) {
          keycloakUpdatePayload.credentials = [
            {
              type: 'password',
              value: dto.password,
              temporary: false,
            },
          ];
        }

        await this.keycloakService.updateUser(token, id, keycloakUpdatePayload);
        this.logger.log(UserProperties.service.update.keycloakSuccess);
      }

      // Update database
      const updateData: any = {};
      if (dto.userName !== undefined) updateData.user_name = dto.userName;
      if (dto.userEmail !== undefined) updateData.user_email = dto.userEmail;
      if (dto.userPhone !== undefined) updateData.user_phone = dto.userPhone;
      if (dto.fkCompanyId !== undefined) updateData.fk_company_id = dto.fkCompanyId;
      if (dto.isActive !== undefined) updateData.is_active = dto.isActive;
      updateData.modified = new Date();

      const objUser = await this.prisma.tbl_user.update({
        where: { pk_user_id: id },
        data: updateData,
      });
      this.logger.log(`${UserProperties.service.update.success}: ${id}`);
      return ResponseHelper.success(objUser, 'User updated successfully');
    } catch (error) {
      this.logger.error(`${UserProperties.service.update.error}: ${id}`, error.stack);
      return ResponseHelper.error('Failed to update user', error.message);
    }
  }

  async delete(id: string) {
    try {
      this.logger.log(`${UserProperties.service.delete.start}: ${id}`);
      const existing = await this.prisma.tbl_user.findUnique({
        where: { pk_user_id: id },
      });
      if (!existing || existing.is_delete) {
        throw new NotFoundException('User not found');
      }

      // Disable user in Keycloak
      this.logger.log(UserProperties.service.delete.keycloakStart);
      const token = await this.keycloakService.getToken();
      await this.keycloakService.disableUser(token, id);
      this.logger.log(UserProperties.service.delete.keycloakSuccess);

      // Soft delete in database
      const objUser = await this.prisma.tbl_user.update({
        where: { pk_user_id: id },
        data: {
          is_delete: true,
          is_active: false,
          modified: new Date(),
        },
      });
      this.logger.log(`${UserProperties.service.delete.success}: ${id}`);
      return ResponseHelper.success(objUser, 'User deleted successfully');
    } catch (error) {
      this.logger.error(`${UserProperties.service.delete.error}: ${id}`, error.stack);
      return ResponseHelper.error('Failed to delete user', error.message);
    }
  }

  async activateDeactivate(id: string, dto: ActivateDeactivateUserDto) {
    try {
      this.logger.log(`${UserProperties.service.activateDeactivate.start}: ${id}`);
      const existing = await this.prisma.tbl_user.findUnique({
        where: { pk_user_id: id },
      });

      console.log(existing) 
      
      if (!existing || existing.is_delete) {
        throw new NotFoundException('User not found');
      }

      // Update user status in Keycloak
      this.logger.log(UserProperties.service.activateDeactivate.keycloakStart);
      const token = await this.keycloakService.getToken();
      await this.keycloakService.updateUser(token, id, { enabled: dto.isActive });
      this.logger.log(UserProperties.service.activateDeactivate.keycloakSuccess);

      // Update status in database
      const objUser = await this.prisma.tbl_user.update({
        where: { pk_user_id: id },
        data: {
          is_active: dto.isActive,
          modified: new Date(),
        },
      });
      this.logger.log(`${UserProperties.service.activateDeactivate.success}: ${id}`);
      return ResponseHelper.success(
        objUser,
        `User ${dto.isActive ? 'activated' : 'deactivated'} successfully`,
      );
    } catch (error) {
      this.logger.error(
        `${UserProperties.service.activateDeactivate.error}: ${id}`,
        error.stack,
      );
      return ResponseHelper.error('Failed to activate/deactivate user', error.message);
    }
  }
}
