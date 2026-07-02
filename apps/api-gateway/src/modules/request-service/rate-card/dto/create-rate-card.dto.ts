import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateRateCardDto {
  @ApiProperty({
    description: 'Unique rate card code',
    example: 'RC-2026-001',
  })
  @IsString()
  @IsNotEmpty()
  rate_card_code: string;

  @ApiProperty({
    description: 'Rate card name',
    example: 'Vendor A - Software Development',
  })
  @IsString()
  @IsNotEmpty()
  rate_card_name: string;

  @ApiProperty({
    description: 'Vendor ID',
    example: '9c0eb7d2-95e1-4a53-9f7f-5c43d8c7fdd2',
  })
  @IsUUID()
  fk_vendor_id: string;

  @ApiProperty({
    description: 'Rate card validity start date',
    example: '2026-01-01',
  })
  @IsDateString()
  valid_from: string;

  @ApiProperty({
    description: 'Rate card validity end date',
    example: '2026-12-31',
  })
  @IsDateString()
  valid_to: string;

  @ApiPropertyOptional({
    description: 'Additional remarks',
    example: 'Applicable for FY2026',
  })
  @IsOptional()
  @IsString()
  remarks?: string;
}