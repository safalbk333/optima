import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateStateDto {
  @ApiProperty({ description: 'State name' })
  @IsString()
  stateName: string;

  @ApiProperty({ description: 'Country ID the city belongs to' })
  @IsString()
  countryId: string;
}

export class UpdateStateDto {
  @ApiPropertyOptional({ description: 'State name' })
  @IsOptional()
  @IsString()
  stateName?: string;

  @ApiPropertyOptional({ description: 'Country ID the state belongs to' })
  @IsOptional()
  @IsString()
  countryId?: string;

  @ApiPropertyOptional({ description: 'Active status' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
