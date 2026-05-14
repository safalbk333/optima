import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CategoryGatewayService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryGatewayService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all categories',
  })
  @ApiResponse({
    status: 200,
    description:
      'Category list fetched successfully',
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a category by ID',
  })
  @ApiResponse({
    status: 200,
    description:
      'Category fetched successfully',
  })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new category',
  })
  @ApiResponse({
    status: 201,
    description:
      'Category created successfully',
  })
  create(
    @Body() data: CreateCategoryDto,
  ) {
    return this.categoryService.create(data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a category',
  })
  @ApiResponse({
    status: 200,
    description:
      'Category updated successfully',
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.update(
      id,
      data,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a category (soft delete)',
  })
  @ApiResponse({
    status: 200,
    description:
      'Category deleted successfully',
  })
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
