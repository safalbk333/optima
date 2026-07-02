import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CloneRateCardDto {
  @ApiProperty({
    description: 'New rate card code',
    example: 'RC-2026-002',
  })
  @IsString()
  @IsNotEmpty()
  rate_card_code: string;

  @ApiProperty({
    description: 'New rate card name',
    example: 'Vendor A - Software Development Copy',
  })
  @IsString()
  @IsNotEmpty()
  rate_card_name: string;

  @ApiProperty({
    description: 'New validity start date',
    example: '2027-01-01',
  })
  @IsDateString()
  valid_from: string;

  @ApiProperty({
    description: 'New validity end date',
    example: '2027-12-31',
  })
  @IsDateString()
  valid_to: string;
}