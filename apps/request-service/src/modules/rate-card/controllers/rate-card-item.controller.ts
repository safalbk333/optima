import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { RateCardItemService } from '../services/rate-card-item.service';
import { CreateRateCardItemDto } from '../dto/rate-card-item/create-rate-card-item.dto';
import { UpdateRateCardItemDto } from '../dto/rate-card-item/update-rate-card-item.dto';
import { RateCardItemResponseDto } from '../dto/rate-card-item/rate-card-item-response.dto';

@ApiTags('Rate Card Items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rate-cards/:rateCardId/items')
export class RateCardItemController {
  constructor(private readonly rateCardItemService: RateCardItemService) {}

  @Post()
  @ApiOperation({ summary: 'Add an item to a rate card with a pricing type' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiResponse({ status: HttpStatus.CREATED, type: RateCardItemResponseDto })
  @HttpCode(HttpStatus.CREATED)
  async addItem(
    @Param('rateCardId', ParseUUIDPipe) rateCardId: string,
    @Body() dto: CreateRateCardItemDto,
    @CurrentUser('pk_user_id') userId: string,
  ): Promise<RateCardItemResponseDto> {
    return this.rateCardItemService.addItem(rateCardId, dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'List all items in a rate card with their pricing' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiResponse({ status: HttpStatus.OK, type: [RateCardItemResponseDto] })
  async listItems(
    @Param('rateCardId', ParseUUIDPipe) rateCardId: string,
  ): Promise<RateCardItemResponseDto[]> {
    return this.rateCardItemService.listItems(rateCardId);
  }

  @Patch(':itemId')
  @ApiOperation({ summary: 'Update a rate card item (currency / active flag)' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiResponse({ status: HttpStatus.OK, type: RateCardItemResponseDto })
  async updateItem(
    @Param('rateCardId', ParseUUIDPipe) rateCardId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Body() dto: UpdateRateCardItemDto,
    @CurrentUser('pk_user_id') userId: string,
  ): Promise<RateCardItemResponseDto> {
    return this.rateCardItemService.updateItem(rateCardId, itemId, dto, userId);
  }

  @Delete(':itemId')
  @ApiOperation({ summary: 'Remove an item from a rate card' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteItem(
    @Param('rateCardId', ParseUUIDPipe) rateCardId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
  ): Promise<void> {
    return this.rateCardItemService.deleteItem(rateCardId, itemId);
  }
}