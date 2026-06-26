import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateItemDto, UpdateItemDto } from './dto/create-item.dto';
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
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search for items by Item name, Item code, SAC code'
  })
  findAll(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('search') search?: string,
  ) {
    const payload = {
      limit: Number(limit),
      page: Number(page),
      search: search,
    };
    return this.itemService.findAll(payload);
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

  @Put(':id')
  @ApiOperation({ summary: 'Update an Item' })
  @ApiResponse({ status: 200, description: 'Item updated successfully' })
  update(@Param('id') id: string, @Body() data: UpdateItemDto) {
    return this.itemService.update(id, data);
  }
}