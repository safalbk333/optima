import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNumber,
  IsDateString,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateVendorDto {
  @ApiProperty({ description: 'Name of the vendor company name', })
  @IsString()
  company_legal_name: string;

  @ApiPropertyOptional({ description: 'vendor company trading name(if different)', })
  @IsString()
  trading_name: string;

  @ApiProperty({
    description: 'Vendor company type',
    example: 'Private Ltd / LLP / Sole Proprietor / Partnership / Foreign Entity'
  })
  @IsString()
  company_type: string;

  @ApiProperty({ description: 'Year of establishment', })
  @IsInt()
  year_of_establishment: number;

  @ApiProperty({ description: 'office address', })
  @IsString()
  office_address: string;

  @ApiProperty({ description: 'office address', })
  @IsString()
  GST_number: string;

  @ApiProperty({ description: 'office address', })
  @IsString()
  PAN_number: string;

  @ApiProperty({ description: 'office address', })
  @IsString()
  MSME_status: string;

  @ApiProperty({ description: 'office address', })
  @IsString()
  bank: string;

  @ApiProperty({
    description: 'Nature of business',
    example: 'Goods Supplier / Service Provider / Both'
  })
  @IsString()
  nature_of_business: string;

  @ApiProperty({ description: 'category of supply', })
  @IsString()
  categories_of_supply: string;

  @ApiProperty({ description: 'Contact person', })
  @IsString()
  contact_person: string;

  @ApiProperty({ description: 'vendor email', })
  @IsString()
  email: string;

  @ApiProperty({ description: 'vendor phone', })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'vendor country', })
  @IsString()
  fk_country_id: string;

  @ApiProperty({ description: 'vendor city', })
  @IsString()
  fk_city_id: string;

  @ApiProperty({ description: 'vendor status', default: 'PENDING' })
  @IsString()
  status: string;
}

export class UpdateVendorDto {
  @ApiProperty({ description: 'Name of the vendor company name', })
  @IsString()
  company_legal_name: string;

  @ApiPropertyOptional({ description: 'vendor company trading name(if different)', })
  @IsString()
  trading_name: string;

  @ApiProperty({
    description: 'Vendor company type',
    example: 'Private Ltd / LLP / Sole Proprietor / Partnership / Foreign Entity'
  })
  @IsString()
  company_type: string;

  @ApiProperty({ description: 'Year of establishment', })
  @IsInt()
  year_of_establishment: number;

  @ApiProperty({ description: 'office address', })
  @IsString()
  office_address: string;

  @ApiProperty({ description: 'office address', })
  @IsString()
  GST_number: string;

  @ApiProperty({ description: 'office address', })
  @IsString()
  PAN_number: string;

  @ApiProperty({ description: 'office address', })
  @IsString()
  MSME_status: string;

  @ApiProperty({ description: 'office address', })
  @IsString()
  bank: string;

  @ApiProperty({
    description: 'Nature of business',
    example: 'Goods Supplier / Service Provider / Both'
  })
  @IsString()
  nature_of_business: string;

  @ApiProperty({ description: 'category of supply', })
  @IsString()
  categories_of_supply: string;

  @ApiProperty({ description: 'Contact person', })
  @IsString()
  contact_person: string;

  @ApiProperty({ description: 'vendor email', })
  @IsString()
  email: string;

  @ApiProperty({ description: 'vendor phone', })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'vendor country', })
  @IsString()
  fk_country_id: string;

  @ApiProperty({ description: 'vendor city', })
  @IsString()
  fk_city_id: string;

  @ApiProperty({ description: 'vendor status', })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Notes', })
  @IsString()
  notes: string;
}
