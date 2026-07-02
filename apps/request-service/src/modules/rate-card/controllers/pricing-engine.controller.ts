import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { PricingEngineService } from '../services/pricing-engine.service';
import { CalculatePriceDto } from '../dto/pricing-engine/calculate-price.dto';
import { PriceResultDto } from '../dto/pricing-engine/price-result.dto';

@ApiTags('Pricing Engine')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pricing')
export class PricingEngineController {
  constructor(private readonly pricingEngineService: PricingEngineService) {}

  @Post('calculate')
  @ApiOperation({
    summary: 'Calculate price for a vendor/item using the active rate card',
    description:
      'Resolves the active vendor-item-price mapping and applies the correct pricing strategy (FIXED, TIER, or MILESTONE) to compute unit and total price.',
  })
  @ApiResponse({ status: HttpStatus.OK, type: PriceResultDto })
  @HttpCode(HttpStatus.OK)
  async calculate(@Body() dto: CalculatePriceDto): Promise<PriceResultDto> {
    return this.pricingEngineService.calculatePrice(dto);
  }
}