import { Controller } from '@nestjs/common';

import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CategoryProperties } from '../../common/properties/category.properties';

@Controller()
export class CategoryController {
  private readonly logger = new AppLogger(CategoryController.name);

  constructor(
    private readonly categoryService: CategoryService,
  ) {
    this.logger.log(CategoryProperties.controller.start);
  }

  @MessagePattern('category.findAll')
  findAll() {
    this.logger.log(CategoryProperties.controller.findAll);
    return this.categoryService.findAll();
  }

  @MessagePattern('category.findOne')
  findOne(@Payload() id: string) {
    this.logger.log(`${CategoryProperties.controller.findOne}: ${id}`);
    return this.categoryService.findOne(id);
  }

  @MessagePattern('category.create')
  create(
    @Payload() data: CreateCategoryDto,
  ) {
    this.logger.log(CategoryProperties.controller.create);
    return this.categoryService.create(data);
  }

  @MessagePattern('category.update')
  update(
    @Payload()
    payload: {
      id: string;
      data: UpdateCategoryDto;
    },
  ) {
    this.logger.log(`${CategoryProperties.controller.update}: ${payload.id}`);
    return this.categoryService.update(
      payload.id,
      payload.data,
    );
  }

  @MessagePattern('category.delete')
  delete(@Payload() id: string) {
    this.logger.log(`${CategoryProperties.controller.delete}: ${id}`);
    return this.categoryService.delete(id);
  }
}
