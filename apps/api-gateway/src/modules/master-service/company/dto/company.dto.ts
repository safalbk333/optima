import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Company name' })
  @IsString()
  companyName: string;

  @ApiProperty({ description: 'Unique company code' })
  @IsString()
  companyCode: string;

  @ApiProperty({ description: 'Company email address' })
  @IsString()
  companyEmail: string;

  @ApiProperty({ description: 'Company phone number' })
  @IsString()
  companyPhone: string;

  @ApiPropertyOptional({ description: 'Company address' })
  @IsOptional()
  @IsString()
  companyAddress?: string;

  @ApiPropertyOptional({ description: 'City' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'State' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: 'Country' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ description: 'Postal code' })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiPropertyOptional({ description: 'Company website' })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({ description: 'Tax / GST number' })
  @IsOptional()
  @IsString()
  taxNumber?: string;

  @ApiPropertyOptional({ description: 'Default currency (e.g. USD)' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ description: 'Company logo URL' })
  @IsOptional()
  @IsString()
  logoUrl?: string;
}

export class UpdateCompanyDto {
  @ApiPropertyOptional({ description: 'Company name' })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional({ description: 'Unique company code' })
  @IsOptional()
  @IsString()
  companyCode?: string;

  @ApiPropertyOptional({ description: 'Company email address' })
  @IsOptional()
  @IsString()
  companyEmail?: string;

  @ApiPropertyOptional({ description: 'Company phone number' })
  @IsOptional()
  @IsString()
  companyPhone?: string;

  @ApiPropertyOptional({ description: 'Company address' })
  @IsOptional()
  @IsString()
  companyAddress?: string;

  @ApiPropertyOptional({ description: 'City' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'State' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: 'Country' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ description: 'Postal code' })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiPropertyOptional({ description: 'Company website' })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({ description: 'Tax / GST number' })
  @IsOptional()
  @IsString()
  taxNumber?: string;

  @ApiPropertyOptional({ description: 'Default currency (e.g. USD)' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ description: 'Company logo URL' })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiPropertyOptional({ description: 'Active status' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
