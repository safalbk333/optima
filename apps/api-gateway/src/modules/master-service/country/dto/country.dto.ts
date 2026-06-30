import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({ description: 'Country name' })
  @IsString()
  countryName: string;

  @ApiProperty({ description: 'Country code (e.g. IN, US)' })
  @IsString()
  countryCode: string;
}

export class UpdateCountryDto {
  @ApiPropertyOptional({ description: 'Country name' })
  @IsOptional()
  @IsString()
  countryName?: string;

  @ApiPropertyOptional({ description: 'Country code (e.g. IN, US)' })
  @IsOptional()
  @IsString()
  countryCode?: string;

  @ApiPropertyOptional({ description: 'Active status' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
