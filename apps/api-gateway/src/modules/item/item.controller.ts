import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemGatewayService } from './item.service';

@ApiTags('Item-Service')
@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemGatewayService,
  ) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new item',
  })
  @ApiResponse({
    status: 200,
    description:
      'Item created successfully',
  })
  create(@Body() data: CreateItemDto) {
    return this.itemService.create(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all items',
  })
  @ApiResponse({
    status: 200,
    description:
      'Item list fetched successfully',
  })
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get item by id',
  })
  @ApiResponse({
    status: 200,
    description:
      'Item fetched successfully',
  })
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }
}