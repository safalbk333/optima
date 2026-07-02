import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PricingType } from '../../enums/pricing-type.enum';

export class PriceResultDto {
  @ApiProperty()
  fk_vendor_id: string;

  @ApiProperty()
  fk_item_id: string;

  @ApiProperty()
  fk_rate_card_id: string;

  @ApiProperty()
  rate_card_code: string;

  @ApiProperty({ enum: PricingType })
  pricing_type: string;

  @ApiPropertyOptional()
  quantity?: number;

  @ApiPropertyOptional()
  milestone_name?: string;

  @ApiProperty()
  unit_price: number;

  @ApiProperty()
  total_price: number;

  @ApiProperty()
  currency: string;

  constructor(partial: Partial<PriceResultDto>) {
    Object.assign(this, partial);
  }
}