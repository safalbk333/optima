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
import { CreateTierPriceDto } from './dto/create-tier-price.dto';
import { UpdateTierPriceDto } from './dto/update-tier-price.dto';

@ApiTags('Rate Card - Tier Pricing')
@Controller('rate-cards/:rateCardId/items/:itemId/tiers')
export class TierPriceGatewayController {
  constructor(private readonly rateCardService: RateCardGatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a tier price band for a rate card item' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Tier created successfully' })
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('rateCardId') rateCardId: string,
    @Param('itemId') itemId: string,
    @Body() dto: CreateTierPriceDto,
  ) {
    return this.rateCardService.createTier(rateCardId, itemId, dto);
  }

  @Patch(':tierId')
  @ApiOperation({ summary: 'Update a tier price band' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiParam({ name: 'tierId', description: 'Tier UUID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Tier updated successfully' })
  update(
    @Param('rateCardId') rateCardId: string,
    @Param('itemId') itemId: string,
    @Param('tierId') tierId: string,
    @Body() dto: UpdateTierPriceDto,
  ) {
    return this.rateCardService.updateTier(rateCardId, itemId, tierId, dto);
  }

  @Delete(':tierId')
  @ApiOperation({ summary: 'Delete a tier price band' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiParam({ name: 'tierId', description: 'Tier UUID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Tier deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param('rateCardId') rateCardId: string,
    @Param('itemId') itemId: string,
    @Param('tierId') tierId: string,
  ) {
    return this.rateCardService.deleteTier(rateCardId, itemId, tierId);
  }
}