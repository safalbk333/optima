import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from ".././../../../../libs/database/prisma-service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ResponseHelper } from "libs/common/utils/helper/response.helper";
import { AppLogger } from '../../common/logger/app.logger';
import { CategoryProperties } from '../../common/properties/category.properties';

@Injectable()
export class CategoryService {
  private readonly logger = new AppLogger(CategoryService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      this.logger.log(CategoryProperties.service.findAll.start);
      const arrCategories = await this.prisma.tbl_category.findMany({
        where: {
          bln_is_active: true,
        },
      });

      this.logger.log(CategoryProperties.service.findAll.success);
      return ResponseHelper.success(
        arrCategories,
        "Categories fetched successfully",
      );
    } catch (error) {
      this.logger.error(
        CategoryProperties.service.findAll.error,
        error.stack,
      );
      return ResponseHelper.error("Failed to fetch categories", error.message);
    }
  }
  
  async findOne(strId: string) {
    try {
      this.logger.log(`${CategoryProperties.service.findOne.start}: ${strId}`);
      const objCategory = await this.prisma.tbl_category.findUnique({
        where: { pk_chr_category_id: strId },
      });

      if (!objCategory || objCategory.dt_deleted_at !== null) {
        throw new NotFoundException("Category not found");
      }

      this.logger.log(`${CategoryProperties.service.findOne.success}: ${strId}`);
      return objCategory;
    } catch (error) {
      this.logger.error(
        `${CategoryProperties.service.findOne.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  async create(objData: CreateCategoryDto) {
    try {
      this.logger.log(CategoryProperties.service.create.start);
      const objCategory = await this.prisma.tbl_category.create({
        data: {
          chr_category_name: objData.strCategoryName,
        },
      });
      this.logger.log(`${CategoryProperties.service.create.success}: ${objCategory.pk_chr_category_id}`);
      return objCategory;
    } catch (error) {
      this.logger.error(
        CategoryProperties.service.create.error,
        error.stack,
      );
      throw error;
    }
  }

  async update(strId: string, objData: UpdateCategoryDto) {
    try {
      this.logger.log(`${CategoryProperties.service.update.start}: ${strId}`);
      const objCategory = await this.prisma.tbl_category.findUnique({
        where: { pk_chr_category_id: strId },
      });

      if (!objCategory || objCategory.dt_deleted_at !== null) {
        throw new NotFoundException("Category not found");
      }

      const updateData: any = {};
      if (objData.strCategoryName !== undefined) {
        updateData.chr_category_name = objData.strCategoryName;
      }
      if (objData.blnIsActive !== undefined) {
        updateData.bln_is_active = objData.blnIsActive;
      }

      const objUpdatedCategory = await this.prisma.tbl_category.update({
        where: { pk_chr_category_id: strId },
        data: updateData,
      });
      this.logger.log(`${CategoryProperties.service.update.success}: ${strId}`);
      return objUpdatedCategory;
    } catch (error) {
      this.logger.error(
        `${CategoryProperties.service.update.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  async delete(strId: string) {
    try {
      this.logger.log(`${CategoryProperties.service.delete.start}: ${strId}`);
      const objCategory = await this.prisma.tbl_category.findUnique({
        where: { pk_chr_category_id: strId },
      });

      if (!objCategory || objCategory.dt_deleted_at !== null) {
        throw new NotFoundException("Category not found");
      }

      const objDeletedCategory = await this.prisma.tbl_category.update({
        where: { pk_chr_category_id: strId },
        data: {
          dt_deleted_at: new Date(),
          bln_is_active: false,
        },
      });
      this.logger.log(`${CategoryProperties.service.delete.success}: ${strId}`);
      return objDeletedCategory;
    } catch (error) {
      this.logger.error(
        `${CategoryProperties.service.delete.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }
}
