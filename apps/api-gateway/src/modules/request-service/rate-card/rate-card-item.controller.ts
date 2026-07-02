import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RateCardGatewayService } from './rate-card.service';
import { CreateRateCardItemDto } from './dto/create-rate-card-item.dto';
import { UpdateRateCardItemDto } from './dto/update-rate-card-item.dto';

@ApiTags('Rate Card Items')
@Controller('rate-cards/:rateCardId/items')
export class RateCardItemGatewayController {
  constructor(private readonly rateCardService: RateCardGatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Add an item to a rate card' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Item added successfully' })
  @HttpCode(HttpStatus.CREATED)
  addItem(
    @Param('rateCardId') rateCardId: string,
    @Body() dto: CreateRateCardItemDto,
    @Req() req: any,
  ) {
    return this.rateCardService.addItem(rateCardId, dto, req.user?.pk_user_id);
  }

  @Get()
  @ApiOperation({ summary: 'List all items in a rate card' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Items fetched successfully' })
  listItems(@Param('rateCardId') rateCardId: string) {
    return this.rateCardService.listItems(rateCardId);
  }

  @Patch(':itemId')
  @ApiOperation({ summary: 'Update a rate card item' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Item updated successfully' })
  updateItem(
    @Param('rateCardId') rateCardId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateRateCardItemDto,
    @Req() req: any,
  ) {
    return this.rateCardService.updateItem(rateCardId, itemId, dto, req.user?.pk_user_id);
  }

  @Delete(':itemId')
  @ApiOperation({ summary: 'Remove an item from a rate card' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Item deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteItem(@Param('rateCardId') rateCardId: string, @Param('itemId') itemId: string) {
    return this.rateCardService.deleteItem(rateCardId, itemId);
  }
}