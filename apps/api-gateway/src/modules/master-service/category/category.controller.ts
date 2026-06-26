import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  ParseBoolPipe,
  DefaultValuePipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiExtraModels,
} from '@nestjs/swagger';

import { CategoryGatewayService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MoveCategoryDto } from './dto/move-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryGatewayService,
  ) {}

  // ─── Queries ──────────────────────────────────────────────────────────────

  @Get()
  @ApiOperation({
    summary: 'Get all categories as a nested tree',
    description:
      'Returns every active category structured as a recursive tree. ' +
      'Each node contains a `children` array with its direct descendants.',
  })
  @ApiResponse({
    status: 200,
    description: 'Category tree fetched successfully',
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('roots')
  @ApiOperation({
    summary: 'Get root categories',
    description:
      'Returns only top-level categories (hierarchy_level = 1, no parent).',
  })
  @ApiResponse({
    status: 200,
    description: 'Root categories fetched successfully',
  })
  findRoots() {
    return this.categoryService.findRoots();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a single category by ID',
  })
  @ApiParam({ name: 'id', description: 'Category UUID', type: String })
  @ApiResponse({ status: 200, description: 'Category fetched successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  findOne(@Param('id', ParseUUIDPipe) strId: string) {
    return this.categoryService.findOne(strId);
  }

  @Get(':id/subtree')
  @ApiOperation({
    summary: 'Get a category and its entire subtree',
    description:
      'Returns the specified category node with all descendants nested ' +
      'recursively inside `children` arrays.',
  })
  @ApiParam({ name: 'id', description: 'Category UUID', type: String })
  @ApiResponse({ status: 200, description: 'Subtree fetched successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  findSubtree(@Param('id', ParseUUIDPipe) strId: string) {
    return this.categoryService.findSubtree(strId);
  }

  @Get(':id/ancestors')
  @ApiOperation({
    summary: 'Get ancestors of a category',
    description:
      'Returns the chain of ancestor nodes from root down to the direct parent, ' +
      'ordered root-first. The node itself is excluded.',
  })
  @ApiParam({ name: 'id', description: 'Category UUID', type: String })
  @ApiResponse({ status: 200, description: 'Ancestors fetched successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  findAncestors(@Param('id', ParseUUIDPipe) strId: string) {
    return this.categoryService.findAncestors(strId);
  }

  // ─── Mutations ────────────────────────────────────────────────────────────

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new category',
    description:
      'Creates a category node. ' +
      'Provide `strParentCategoryId` to nest it under a parent; ' +
      'omit it to create a root-level category.',
  })
  @ApiBody({ type: CreateCategoryDto })
  @ApiQuery({
    name: 'createdById',
    required: false,
    description: 'UUID of the user creating the record (audit trail)',
    type: String,
  })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @ApiResponse({ status: 404, description: 'Parent category not found' })
  create(
    @Body() data: CreateCategoryDto,
    @Query('createdById') strCreatedById?: string,
  ) {
    return this.categoryService.create(data, strCreatedById);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a category',
    description:
      'Updates the name and/or active status of a category. ' +
      'Does NOT change the tree position — use PATCH /:id/move for that.',
  })
  @ApiParam({ name: 'id', description: 'Category UUID', type: String })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiQuery({
    name: 'modifiedById',
    required: false,
    description: 'UUID of the user making the change (audit trail)',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  update(
    @Param('id', ParseUUIDPipe) strId: string,
    @Body() data: UpdateCategoryDto,
    @Query('modifiedById') strModifiedById?: string,
  ) {
    return this.categoryService.update(strId, data, strModifiedById);
  }

  @Patch(':id/move')
  @ApiOperation({
    summary: 'Move a category to a new parent',
    description:
      'Relocates a category node (and its entire subtree) under a different parent. ' +
      'Pass `strNewParentCategoryId: null` to promote the node to root level. ' +
      'Guards against circular references and no-op moves.',
  })
  @ApiParam({ name: 'id', description: 'Category UUID to move', type: String })
  @ApiBody({ type: MoveCategoryDto })
  @ApiQuery({
    name: 'modifiedById',
    required: false,
    description: 'UUID of the user making the change (audit trail)',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Category moved successfully' })
  @ApiResponse({ status: 400, description: 'Circular reference or no-op move' })
  @ApiResponse({ status: 404, description: 'Category or new parent not found' })
  move(
    @Param('id', ParseUUIDPipe) strId: string,
    @Body() data: MoveCategoryDto,
    @Query('modifiedById') strModifiedById?: string,
  ) {
    return this.categoryService.move(strId, data, strModifiedById);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Soft-delete a category',
    description:
      'Marks the category as deleted (`is_delete = true`, `is_active = false`). ' +
      'Pass `cascade=true` to soft-delete the entire subtree in one operation.',
  })
  @ApiParam({ name: 'id', description: 'Category UUID', type: String })
  @ApiQuery({
    name: 'cascade',
    required: false,
    description: 'When true, deletes all descendant nodes as well',
    type: Boolean,
  })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  delete(
    @Param('id', ParseUUIDPipe) strId: string,
    @Query('cascade', new DefaultValuePipe(false), ParseBoolPipe)
    blnCascade: boolean,
  ) {
    return this.categoryService.delete(strId, blnCascade);
  }
}