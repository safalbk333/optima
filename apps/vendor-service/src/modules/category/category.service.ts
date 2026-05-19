import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from ".././../../../../libs/database/prisma-service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ResponseHelper } from "libs/common/utils/helper/response.helper";

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      const categories = await this.prisma.category.findMany({
        where: {
          isDeleted: false,
        },
      });

      return ResponseHelper.success(
        categories,
        "Categories fetched successfully",
      );
    } catch (error) {
      return ResponseHelper.error("Failed to fetch categories", error.message);
    }
  }
  // ✅ Get a single category by ID
  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { categoryId: id },
    });

    if (!category || category.isDeleted) {
      throw new NotFoundException("Category not found");
    }

    return category;
  }

  // ✅ Create a new category
  async create(data: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        categoryName: data.categoryName,
      },
    });
  }

  // ✅ Update a category
  async update(id: string, data: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { categoryId: id },
    });

    if (!category || category.isDeleted) {
      throw new NotFoundException("Category not found");
    }

    return this.prisma.category.update({
      where: { categoryId: id },
      data,
    });
  }

  // ✅ Soft delete a category
  async delete(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { categoryId: id },
    });

    if (!category || category.isDeleted) {
      throw new NotFoundException("Category not found");
    }

    return this.prisma.category.update({
      where: { categoryId: id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        isActive: false,
      },
    });
  }
}
