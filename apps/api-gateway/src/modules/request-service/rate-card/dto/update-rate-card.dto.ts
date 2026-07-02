import { ApiPropertyOptional, PartialType, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateRateCardDto } from './create-rate-card.dto';

export class UpdateRateCardDto extends PartialType(
  OmitType(CreateRateCardDto, ['rate_card_code'] as const),
) {
  @ApiPropertyOptional({ example: 'Updated remarks after vendor negotiation' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  remarks?: string;
}
