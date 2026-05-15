import { Controller } from '@nestjs/common';

import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller()
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  @MessagePattern('category.findAll')
  findAll() {
    return this.categoryService.findAll();
  }

  @MessagePattern('category.findOne')
  findOne(@Payload() id: string) {
    return this.categoryService.findOne(id);
  }

  @MessagePattern('category.create')
  create(
    @Payload() data: CreateCategoryDto,
  ) {
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
    return this.categoryService.update(
      payload.id,
      payload.data,
    );
  }

  @MessagePattern('category.delete')
  delete(@Payload() id: string) {
    return this.categoryService.delete(id);
  }
}
