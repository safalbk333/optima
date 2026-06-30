import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCurrencyDto {
  @ApiProperty({ description: 'Currency name' })
  @IsString()
  currencyName: string;

  @ApiProperty({ description: 'Currency code (e.g. USD, INR)' })
  @IsString()
  currencyCode: string;

  @ApiProperty({ description: 'Currency symbol (e.g. $, ₹)' })
  @IsString()
  symbol: string;

  @ApiPropertyOptional({ description: 'Currency description' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateCurrencyDto {
  @ApiPropertyOptional({ description: 'Currency name' })
  @IsOptional()
  @IsString()
  currencyName?: string;

  @ApiPropertyOptional({ description: 'Currency code (e.g. USD, INR)' })
  @IsOptional()
  @IsString()
  currencyCode?: string;

  @ApiPropertyOptional({ description: 'Currency symbol (e.g. $, ₹)' })
  @IsOptional()
  @IsString()
  symbol?: string;

  @ApiPropertyOptional({ description: 'Currency description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Currency active status' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
