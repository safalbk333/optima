import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PricingType } from '../../enums/pricing-type.enum';

export class RateCardItemResponseDto {
  @ApiProperty()
  pk_rate_card_item_id: string;

  @ApiProperty()
  fk_rate_card_id: string;

  @ApiProperty()
  fk_item_id: string;

  @ApiPropertyOptional()
  item_name?: string;

  @ApiPropertyOptional()
  item_code?: string;

  @ApiProperty({ enum: PricingType })
  pricing_type: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  is_active: boolean;

  @ApiPropertyOptional()
  fixed_price?: { unit_price: number };

  @ApiPropertyOptional()
  tiers?: { min_qty: number; max_qty: number; unit_price: number }[];

  @ApiPropertyOptional()
  milestones?: { milestone_name: string; milestone_order: number; unit_price: number }[];

  constructor(partial: Partial<RateCardItemResponseDto>) {
    Object.assign(this, partial);
  }
}