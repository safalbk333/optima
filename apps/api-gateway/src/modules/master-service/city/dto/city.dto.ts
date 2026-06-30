import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCityDto {
  @ApiProperty({ description: 'City name' })
  @IsString()
  cityName: string;

  @ApiProperty({ description: 'Country ID the city belongs to' })
  @IsString()
  countryId: string;
}

export class UpdateCityDto {
  @ApiPropertyOptional({ description: 'City name' })
  @IsOptional()
  @IsString()
  cityName?: string;

  @ApiPropertyOptional({ description: 'Country ID the city belongs to' })
  @IsOptional()
  @IsString()
  countryId?: string;

  @ApiPropertyOptional({ description: 'Active status' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
