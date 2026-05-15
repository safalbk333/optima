import { Controller, Param } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemService } from './item.service';

@Controller()
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
  ) {}
  
  @MessagePattern('item.create')
  create(@Payload() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @MessagePattern('item.findAll')
  findAll() {
    return this.itemService.findAll();
  }

  @MessagePattern('item.findOne')
  findOne(@Payload() data: { id: string }) {
    return this.itemService.findOne(data.id);
  }
}