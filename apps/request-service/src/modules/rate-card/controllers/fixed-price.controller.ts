import {
  Body,
  Controller,
  Delete,
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
import { FixedPriceService } from '../services/fixed-price.service';
import { CreateFixedPriceDto } from '../dto/fixed-price/create-fixed-price.dto';
import { UpdateFixedPriceDto } from '../dto/fixed-price/update-fixed-price.dto';

@ApiTags('Rate Card - Fixed Pricing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rate-cards/:rateCardId/items/:itemId/fixed-price')
export class FixedPriceController {
  constructor(private readonly fixedPriceService: FixedPriceService) {}

  @Post()
  @ApiOperation({ summary: 'Create fixed price for a rate card item' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('rateCardId', ParseUUIDPipe) rateCardId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Body() dto: CreateFixedPriceDto,
  ) {
    return this.fixedPriceService.create(rateCardId, itemId, dto);
  }

  @Patch()
  @ApiOperation({ summary: 'Update fixed price for a rate card item' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiResponse({ status: HttpStatus.OK })
  async update(
    @Param('rateCardId', ParseUUIDPipe) rateCardId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Body() dto: UpdateFixedPriceDto,
  ) {
    return this.fixedPriceService.update(rateCardId, itemId, dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete fixed price for a rate card item' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('rateCardId', ParseUUIDPipe) rateCardId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
  ): Promise<void> {
    return this.fixedPriceService.delete(rateCardId, itemId);
  }
}