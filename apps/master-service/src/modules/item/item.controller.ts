import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateItemDto, UpdateItemDto } from './dto/create-item.dto';
import { ItemService } from './item.service';
import { AppLogger } from '../../common/logger/app.logger';
import { ItemProperties } from '../../common/properties/item.properties';

@Controller()
export class ItemController {
  private readonly logger = new AppLogger(ItemController.name);

  constructor(private readonly itemService: ItemService) {
    this.logger.log(ItemProperties.controller.start);
  }

  @MessagePattern('item.create')
  create(@Payload() payload: { schemaId: string; data: CreateItemDto }) {
    this.logger.log(ItemProperties.controller.create);
    return this.itemService.create(payload.schemaId, payload.data);
  }

  @MessagePattern('item.findAll')
  findAll(@Payload() payload: { schemaId: string; limit?: number; page?: number; search?: string; category_id?: string; category_name?: string }) {
    this.logger.log(ItemProperties.controller.findAll);
    return this.itemService.findAll(payload.schemaId, payload);
  }

  @MessagePattern('item.findOne')
  findOne(@Payload() payload: { schemaId: string; id: string }) {
    this.logger.log(`${ItemProperties.controller.findOne}: ${payload.id}`);
    return this.itemService.findOne(payload.schemaId, payload.id);
  }

  @MessagePattern('item.update')
  update(@Payload() payload: { schemaId: string; id: string; data: UpdateItemDto }) {
    this.logger.log(`${ItemProperties.controller.update}: ${payload.id}`);
    return this.itemService.update(payload.schemaId, payload.id, payload.data);
  }
}
