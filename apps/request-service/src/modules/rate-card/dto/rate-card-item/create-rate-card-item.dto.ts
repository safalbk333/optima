import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { PricingType } from '../../enums/pricing-type.enum';

export class CreateRateCardItemDto {
  @ApiProperty({ description: 'Item primary key (UUID)' })
  @IsUUID()
  @IsNotEmpty()
  fk_item_id: string;

  @ApiProperty({ enum: PricingType, example: PricingType.FIXED })
  @IsEnum(PricingType)
  @IsNotEmpty()
  pricing_type: PricingType;

  @ApiProperty({ example: 'INR', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string;
}