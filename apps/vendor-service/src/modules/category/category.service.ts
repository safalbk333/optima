import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '.././../../../../libs/database/prisma-service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  // ✅ Get all active (non-deleted) categories
  async findAll() {
    return this.prisma.category.findMany({
      where: { isDeleted: false },
    });
  }

  // ✅ Get a single category by ID
  async findOne(id: string) {
    const category =
      await this.prisma.category.findUnique({
        where: { categoryId: id },
      });

    if (!category || category.isDeleted) {
      throw new NotFoundException(
        'Category not found',
      );
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
  async update(
    id: string,
    data: UpdateCategoryDto,
  ) {
    const category =
      await this.prisma.category.findUnique({
        where: { categoryId: id },
      });

    if (!category || category.isDeleted) {
      throw new NotFoundException(
        'Category not found',
      );
    }

    return this.prisma.category.update({
      where: { categoryId: id },
      data,
    });
  }

  // ✅ Soft delete a category
  async delete(id: string) {
    const category =
      await this.prisma.category.findUnique({
        where: { categoryId: id },
      });

    if (!category || category.isDeleted) {
      throw new NotFoundException(
        'Category not found',
      );
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
