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
import { TierPriceService } from '../services/tier-price.service';
import { CreateTierPriceDto } from '../dto/tier-price/create-tier-price.dto';
import { UpdateTierPriceDto } from '../dto/tier-price/update-tier-price.dto';

@ApiTags('Rate Card - Tier Pricing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rate-cards/:rateCardId/items/:itemId/tiers')
export class TierPriceController {
  constructor(private readonly tierPriceService: TierPriceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a tier price band for a rate card item' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('rateCardId', ParseUUIDPipe) rateCardId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Body() dto: CreateTierPriceDto,
  ) {
    return this.tierPriceService.create(rateCardId, itemId, dto);
  }

  @Patch(':tierId')
  @ApiOperation({ summary: 'Update a tier price band' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiParam({ name: 'tierId', description: 'Tier UUID' })
  @ApiResponse({ status: HttpStatus.OK })
  async update(
    @Param('rateCardId', ParseUUIDPipe) rateCardId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Param('tierId', ParseUUIDPipe) tierId: string,
    @Body() dto: UpdateTierPriceDto,
  ) {
    return this.tierPriceService.update(rateCardId, itemId, tierId, dto);
  }

  @Delete(':tierId')
  @ApiOperation({ summary: 'Delete a tier price band' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiParam({ name: 'tierId', description: 'Tier UUID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('rateCardId', ParseUUIDPipe) rateCardId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Param('tierId', ParseUUIDPipe) tierId: string,
  ): Promise<void> {
    return this.tierPriceService.delete(rateCardId, itemId, tierId);
  }
}