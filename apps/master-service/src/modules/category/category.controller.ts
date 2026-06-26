import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MoveCategoryDto } from './dto/move-category.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CategoryProperties } from '../../common/properties/category.properties';

@Controller()
export class CategoryController {
  private readonly logger = new AppLogger(CategoryController.name);

  constructor(private readonly categoryService: CategoryService) {
    this.logger.log(CategoryProperties.controller.start);
  }

  // ─── Queries ──────────────────────────────────────────────────────────────

  @MessagePattern('category.findAll')
  findAll() {
    this.logger.log(CategoryProperties.controller.findAll);
    return this.categoryService.findAll();
  }

  @MessagePattern('category.findRoots')
  findRoots() {
    this.logger.log(`${CategoryProperties.controller.findAll} roots`);
    return this.categoryService.findRoots();
  }

  @MessagePattern('category.findOne')
  findOne(@Payload() strId: string) {
    this.logger.log(`${CategoryProperties.controller.findOne}: ${strId}`);
    return this.categoryService.findOne(strId);
  }

  @MessagePattern('category.findSubtree')
  findSubtree(@Payload() strId: string) {
    this.logger.log(`${CategoryProperties.controller.findOne} subtree: ${strId}`);
    return this.categoryService.findSubtree(strId);
  }

  @MessagePattern('category.findAncestors')
  findAncestors(@Payload() strId: string) {
    this.logger.log(`${CategoryProperties.controller.findOne} ancestors: ${strId}`);
    return this.categoryService.findAncestors(strId);
  }

  // ─── Mutations ────────────────────────────────────────────────────────────

  @MessagePattern('category.create')
  create(
    @Payload()
    payload: {
      data: CreateCategoryDto;
      strCreatedById?: string;
    },
  ) {
    this.logger.log(CategoryProperties.controller.create);
    return this.categoryService.create(payload.data, payload.strCreatedById);
  }

  @MessagePattern('category.update')
  update(
    @Payload()
    payload: {
      strId: string;
      data: UpdateCategoryDto;
      strModifiedById?: string;
    },
  ) {
    this.logger.log(`${CategoryProperties.controller.update}: ${payload.strId}`);
    return this.categoryService.update(payload.strId, payload.data, payload.strModifiedById);
  }

  @MessagePattern('category.move')
  move(
    @Payload()
    payload: {
      strId: string;
      data: MoveCategoryDto;
      strModifiedById?: string;
    },
  ) {
    this.logger.log(`${CategoryProperties.controller.update} move: ${payload.strId}`);
    return this.categoryService.move(payload.strId, payload.data, payload.strModifiedById);
  }

  @MessagePattern('category.delete')
  delete(
    @Payload()
    payload: {
      strId: string;
      blnCascade?: boolean;
    },
  ) {
    this.logger.log(`${CategoryProperties.controller.delete}: ${payload.strId}`);
    return this.categoryService.delete(payload.strId, payload.blnCascade ?? false);
  }
}