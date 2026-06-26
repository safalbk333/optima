import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { CreateItemDto, UpdateItemDto } from './dto/create-item.dto';
import { ItemService } from './item.service';
import { AppLogger } from '../../common/logger/app.logger';
import { ItemProperties } from '../../common/properties/item.properties';

@Controller()
export class ItemController {
  private readonly logger = new AppLogger(ItemController.name);

  constructor(
    private readonly itemService: ItemService,
  ) {
    this.logger.log(ItemProperties.controller.start);
  }

  @MessagePattern('item.create')
  create(@Payload() createItemDto: CreateItemDto) {
    this.logger.log(ItemProperties.controller.create);
    return this.itemService.create(createItemDto);
  }

  @MessagePattern('item.findAll')
  findAll(
    @Payload() payload: {
      limit?: number;
      page?: number;
      search?: string;
    },
  ) {
    this.logger.log(ItemProperties.controller.findAll);
    return this.itemService.findAll(payload);
  }

  @MessagePattern('item.findOne')
  findOne(@Payload() data: { id: string }) {
    this.logger.log(`${ItemProperties.controller.findOne}: ${data.id}`);
    return this.itemService.findOne(data.id);
  }

  @MessagePattern('item.update')
  update(@Payload()
  payload: {
    id: string;
    data: UpdateItemDto;
  },
  ) {
    this.logger.log(`${ItemProperties.controller.update}: ${payload.id}`,);
    return this.itemService.update(
      payload.id,
      payload.data,
    );
  }
}
