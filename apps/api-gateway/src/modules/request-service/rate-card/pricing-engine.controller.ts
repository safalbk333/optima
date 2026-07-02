import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RateCardGatewayService } from './rate-card.service';
import { CalculatePriceDto } from './dto/calculate-price.dto';

@ApiTags('Pricing Engine')
@Controller('pricing')
export class PricingEngineGatewayController {
  constructor(private readonly rateCardService: RateCardGatewayService) {}

  @Post('calculate')
  @ApiOperation({
    summary: 'Calculate price for a vendor/item using the active rate card',
    description:
      'Resolves the active vendor-item price mapping and applies FIXED, TIER, or MILESTONE pricing strategy.',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Price calculated successfully' })
  @HttpCode(HttpStatus.OK)
  calculate(@Body() dto: CalculatePriceDto) {
    return this.rateCardService.calculatePrice(dto);
  }
}