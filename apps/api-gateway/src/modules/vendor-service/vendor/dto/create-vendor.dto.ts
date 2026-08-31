import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNumber,
  IsDateString,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsBoolean,
} from 'class-validator';
export enum TaxType {
  GST = 'GST',
  PAN = 'PAN',
}

export class CreateVendorDto {
  @ApiProperty({ description: 'Name of the vendor company name', })
  @IsString()
  company_legal_name: string;

  @ApiPropertyOptional({ description: 'Name of the vendor trading name', })
  @IsOptional()
  @IsString()
  trading_name?: string;

  @ApiProperty({ description: 'Name of the vendor company type', })
  @IsString()
  company_type: string;

  @ApiProperty({ description: 'Registration number', })
  @IsString()
  registration_number: string;

  @ApiPropertyOptional({ description: 'Website of the vendor', })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({ description: 'Business description of the vendor', })
  @IsOptional()
  @IsString()
  business_description?: string;

  @ApiProperty({ description: 'Industry of the vendor', })
  @IsString()
  industry: string;

  @ApiPropertyOptional({ description: 'Number of employees of the vendor', })
  @IsOptional()
  @IsInt()
  number_of_employees?: number;

  @ApiProperty({ description: 'Year of establishment', })
  @IsInt()
  year_of_establishment: number;

  @ApiProperty({ description: 'Name of the vendor MSME status', })
  @IsString()
  msme_status: string;

  @ApiProperty({ description: 'Nature of business', })
  @IsString()
  nature_of_business: string;

  @ApiProperty({ description: 'Category of supply', })
  @IsString()
  categories_of_supply: string;

  @ApiPropertyOptional({ description: 'Status of the vendor', })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Notes of the vendor', })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateVendorAddressDto {
  @ApiProperty({ description: 'Vendor ID', })
  @IsString()
  vendor_id: string;

  @ApiProperty({ description: 'Address type', })
  @IsString()
  address_type: string;

  @ApiProperty({ description: 'Address line 1', })
  @IsString()
  address_line_1: string;

  @ApiPropertyOptional({ description: 'Address line 2', })
  @IsString()
  address_line_2?: string;

  @ApiProperty({ description: 'City ID', })
  @IsString()
  city_id: string;

  @ApiProperty({ description: 'State ID', })
  @IsString()
  state_id: string;

  @ApiProperty({ description: 'Postal code', })
  @IsString()
  postal_code: string;

  @ApiProperty({ description: 'Country ID', })
  @IsString()
  country_id: string;
}

export class CreateVendorContactDto {
  @ApiProperty({ description: 'Vendor ID', })
  @IsString()
  vendor_id: string;

  @ApiProperty({ description: 'First name', })
  @IsString()
  first_name: string;

  @ApiProperty({ description: 'Last name', })
  @IsString()
  last_name: string;

  @ApiPropertyOptional({ description: 'Designation', })
  @IsString()
  designation: string;

  @ApiProperty({ description: 'Business email', })
  @IsEmail()
  business_email: string;

  @ApiProperty({ description: 'Mobile number', })
  @IsNumber()
  mobile_number: string;

  @ApiPropertyOptional({ description: 'Preferred contact method', })
  @IsString()
  preferred_contact_method?: string;

  @ApiPropertyOptional({ description: 'Department', })
  @IsString()
  department?: string;

  @ApiPropertyOptional({ description: 'Alternate email', })
  @IsEmail()
  alternate_email?: string;

  @ApiPropertyOptional({ description: 'Alternate email', })
  @IsBoolean()
  is_primary?: boolean;
}

export class CreateVendorTaxDto {
  @ApiProperty({ description: 'Vendor ID', })
  @IsString()
  vendor_id: string;

  @ApiProperty({ description: 'Country ID', })
  @IsString()
  country_id: string;

  @ApiProperty({ description: 'Tax type', })
  @IsString()
  tax_type: TaxType;

  @ApiProperty({ description: 'Tax number', })
  @IsString()
  tax_number: string;

  @ApiPropertyOptional({ description: 'Registration name', })
  @IsOptional()
  @IsString()
  registration_name?: string;

  @ApiProperty({ description: 'Registration status', })
  @IsString()
  registration_status: string;

  @ApiPropertyOptional({ description: 'Registration date', })
  @IsOptional()
  @IsString()
  registration_date?: Date;

  @ApiPropertyOptional({ description: 'Expiry date', })
  @IsOptional()
  @IsString()
  expiry_date?: Date;
}

export class CreateVendorBankAccountDto {
  @ApiProperty({ description: 'Vendor ID', })
  @IsString()
  vendor_id: string;

  @ApiProperty({ description: 'Beneficiary name', })
  @IsString()
  beneficiary_name: string;

  @ApiProperty({ description: 'Bank name', })
  @IsString()
  bank_name: string;

  @ApiProperty({ description: 'Country ID', })
  @IsString()
  country_id: string;

  @ApiProperty({ description: 'Account number', })
  @IsString()
  account_number: string;

  @ApiProperty({ description: 'Account type', })
  @IsString()
  account_type: string;

  @ApiProperty({ description: 'Currency', })
  @IsString()
  currency: string;

  @ApiProperty({ description: 'Identifier type', })
  @IsString()
  identifier_type: string;

  @ApiProperty({ description: 'Identifier value', })
  @IsString()
  identifier_value: string;

  @ApiPropertyOptional({ description: 'Branch name', })
  @IsString()
  branch_name?: string;

  @ApiProperty({ description: 'Payment method', })
  @IsString()
  payment_method: string;

  @ApiPropertyOptional({ description: 'Remittance email', })
  @IsString()
  remittance_email?: string; 
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
