import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../../libs/database/prisma-service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      const arrUsers = await this.prisma.tbl_user.findMany({
        where: { is_delete: false },
      });
      return ResponseHelper.success(arrUsers, 'Users fetched successfully');
    } catch (error) {
      return ResponseHelper.error('Failed to fetch users', error.message);
    }
  }

  async findOne(id: string) {
    try {
      const objUser = await this.prisma.tbl_user.findUnique({
        where: { pk_user_id: id },
      });
      if (!objUser || objUser.is_delete) {
        throw new NotFoundException('User not found');
      }
      return objUser;
    } catch (error) {
      throw error;
    }
  }

  async create(dto: CreateUserDto) {
    try {
      const objUser = await this.prisma.tbl_user.create({
        data: {
          user_name: dto.userName,
          user_email: dto.userEmail,
          user_phone: dto.userPhone,
          fk_tenant_id: dto.fkTenantId,
          fk_company_id: dto.fkCompanyId,
        },
      });
      return ResponseHelper.success(objUser, 'User created successfully');
    } catch (error) {
      return ResponseHelper.error('Failed to create user', error.message);
    }
  }

  async update(id: string, dto: UpdateUserDto) {
    try {
      const existing = await this.prisma.tbl_user.findUnique({
        where: { pk_user_id: id },
      });
      if (!existing || existing.is_delete) {
        throw new NotFoundException('User not found');
      }

      const updateData: any = {};
      if (dto.userName !== undefined) updateData.user_name = dto.userName;
      if (dto.userEmail !== undefined) updateData.user_email = dto.userEmail;
      if (dto.userPhone !== undefined) updateData.user_phone = dto.userPhone;
      if (dto.fkTenantId !== undefined) updateData.fk_tenant_id = dto.fkTenantId;
      if (dto.fkCompanyId !== undefined) updateData.fk_company_id = dto.fkCompanyId;
      if (dto.isActive !== undefined) updateData.is_active = dto.isActive;
      updateData.modified = new Date();

      const objUser = await this.prisma.tbl_user.update({
        where: { pk_user_id: id },
        data: updateData,
      });
      return ResponseHelper.success(objUser, 'User updated successfully');
    } catch (error) {
      return ResponseHelper.error('Failed to update user', error.message);
    }
  }

  async delete(id: string) {
    try {
      const existing = await this.prisma.tbl_user.findUnique({
        where: { pk_user_id: id },
      });
      if (!existing || existing.is_delete) {
        throw new NotFoundException('User not found');
      }

      const objUser = await this.prisma.tbl_user.update({
        where: { pk_user_id: id },
        data: {
          is_delete: true,
          is_active: false,
          modified: new Date(),
        },
      });
      return ResponseHelper.success(objUser, 'User deleted successfully');
    } catch (error) {
      return ResponseHelper.error('Failed to delete user', error.message);
    }
  }
}
