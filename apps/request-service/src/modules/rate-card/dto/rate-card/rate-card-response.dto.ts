import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RateCardStatus } from '../../enums/rate-card-status.enum';

export class RateCardResponseDto {
  @ApiProperty()
  pk_rate_card_id: string;

  @ApiProperty()
  rate_card_code: string;

  @ApiProperty()
  rate_card_name: string;

  @ApiProperty()
  fk_vendor_id: string;

  @ApiPropertyOptional()
  vendor_name?: string;

  @ApiProperty()
  valid_from: Date;

  @ApiProperty()
  valid_to: Date;

  @ApiProperty({ enum: RateCardStatus })
  status: string;

  @ApiPropertyOptional()
  remarks?: string;

  @ApiProperty()
  created: Date;

  @ApiPropertyOptional()
  modified?: Date;

  @ApiPropertyOptional()
  item_count?: number;

  constructor(partial: Partial<RateCardResponseDto>) {
    Object.assign(this, partial);
  }
}