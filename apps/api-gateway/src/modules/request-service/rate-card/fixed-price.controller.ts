import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RateCardGatewayService } from './rate-card.service';
import { CreateFixedPriceDto } from './dto/create-fixed-price.dto';
import { UpdateFixedPriceDto } from './dto/update-fixed-price.dto';

@ApiTags('Rate Card - Fixed Pricing')
@Controller('rate-cards/:rateCardId/items/:itemId/fixed-price')
export class FixedPriceGatewayController {
  constructor(private readonly rateCardService: RateCardGatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Create fixed price for a rate card item' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Fixed price created successfully' })
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('rateCardId') rateCardId: string,
    @Param('itemId') itemId: string,
    @Body() dto: CreateFixedPriceDto,
  ) {
    return this.rateCardService.createFixedPrice(rateCardId, itemId, dto);
  }

  @Patch()
  @ApiOperation({ summary: 'Update fixed price for a rate card item' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Fixed price updated successfully' })
  update(
    @Param('rateCardId') rateCardId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateFixedPriceDto,
  ) {
    return this.rateCardService.updateFixedPrice(rateCardId, itemId, dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete fixed price for a rate card item' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Fixed price deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('rateCardId') rateCardId: string, @Param('itemId') itemId: string) {
    return this.rateCardService.deleteFixedPrice(rateCardId, itemId);
  }
}