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
      const arrCategories = await this.prisma.category.findMany({
        where: {
          isDeleted: false,
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
      const objCategory = await this.prisma.category.findUnique({
        where: { categoryId: strId },
      });

      if (!objCategory || objCategory.isDeleted) {
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
      const objCategory = await this.prisma.category.create({
        data: {
          categoryName: objData.categoryName,
        },
      });
      this.logger.log(`${CategoryProperties.service.create.success}: ${objCategory.categoryId}`);
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
      const objCategory = await this.prisma.category.findUnique({
        where: { categoryId: strId },
      });

      if (!objCategory || objCategory.isDeleted) {
        throw new NotFoundException("Category not found");
      }

      const objUpdatedCategory = await this.prisma.category.update({
        where: { categoryId: strId },
        data: objData,
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
      const objCategory = await this.prisma.category.findUnique({
        where: { categoryId: strId },
      });

      if (!objCategory || objCategory.isDeleted) {
        throw new NotFoundException("Category not found");
      }

      const objDeletedCategory = await this.prisma.category.update({
        where: { categoryId: strId },
        data: {
          isDeleted: true,
          deletedAt: new Date(),
          isActive: false,
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
