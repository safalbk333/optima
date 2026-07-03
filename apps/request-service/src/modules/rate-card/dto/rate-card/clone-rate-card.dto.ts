import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CloneRateCardDto {
  @ApiProperty({ example: 'RC-2027-001', description: 'New unique rate card code for the clone' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  rate_card_code: string;

  @ApiProperty({ example: 'Q1 2027 Vendor Pricing' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  rate_card_name: string;

  @ApiProperty({ example: '2027-01-01T00:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  valid_from: string;

  @ApiProperty({ example: '2027-06-30T23:59:59.000Z' })
  @IsDateString()
  @IsNotEmpty()
  valid_to: string;
}