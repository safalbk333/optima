import {
    IsString,
    IsOptional,
    IsInt,
    IsBoolean,
    IsEmail,
} from 'class-validator';
// import { TaxType, VerificationStatus } from '../../constant/tax-enum';

export enum TaxType {
  GST = 'GST',
  PAN = 'PAN',
}

export class CreateVendorDto {
    @IsString()
    company_legal_name: string;

    @IsString()
    trading_name?: string;

    @IsString()
    company_type: string;

    @IsString()
    registration_number: string;

    @IsString()
    website?: string;

    @IsString()
    business_description?: string;

    @IsString()
    industry: string;

    @IsInt()
    number_of_employees?: number;

    @IsString()
    year_of_establishment: number;

    @IsString()
    msme_status: string;

    @IsString()
    nature_of_business: string;

    @IsString()
    categories_of_supply: string;

    @IsString()
    status: string;

    @IsString()
    notes?: string;

    addresses: CreateVendorAddressDto[];
    tax_registrations: CreateVendorTaxDto[];
    bank_accounts: CreateVendorBankAccountDto[];
    contacts: CreateVendorContactDto[];
}

export class CreateVendorAddressDto {
    @IsString()
    vendor_id: string;

    @IsString()
    address_type: string;

    @IsString()
    address_line_1: string;

    @IsString()
    address_line_2?: string;

    @IsString()
    city_id: string;

    @IsString()
    state_id: string;

    @IsString()
    postal_code: string;

    @IsString()
    country_id: string;
}

export class CreateVendorContactDto {
  @IsString()
  vendor_id: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsEmail()
  business_email: string;

  @IsString()
  mobile_number: string;

  @IsOptional()
  @IsString()
  preferred_contact_method?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsEmail()
  alternate_email?: string;

  @IsOptional()
  @IsBoolean()
  is_primary?: boolean;
}

export class CreateVendorTaxDto {
    @IsString()
    vendor_id: string;

    @IsString()
    country_id: string;

    @IsString()
    tax_type: TaxType;

    @IsString()
    tax_number: string;

    @IsString()
    registration_name?: string;

    @IsString()
    registration_status: string;

    @IsString()
    registration_date?: Date;

    @IsString()
    expiry_date?: Date;
}

export class CreateVendorBankAccountDto {
    @IsString()
    vendor_id: string;
    
    @IsString()
    beneficiary_name: string;

    @IsString()
    bank_name: string;

    @IsString()
    country_id: string;

    @IsString()
    account_number: string;

    @IsString()
    account_type: string;

    @IsString()
    currency: string;

    @IsString()
    identifier_type: string;

    @IsString()
    identifier_value: string;

    @IsString()
    branch_name?: string;

    @IsString()
    payment_method: string;

    @IsString()
    remittance_email?: string;
}

export class UpdateVendorDto {
    @IsOptional()
    @IsString()
    company_legal_name: string;

    @IsOptional()
    @IsString()
    trading_name: string;

    @IsOptional()
    @IsString()
    company_type: string;

    @IsOptional()
    @IsInt()
    year_of_establishment: number;

    @IsOptional()
    @IsString()
    office_address: string;

    @IsOptional()
    @IsString()
    GST_number: string;

    @IsOptional()
    @IsString()
    PAN_number: string;

    @IsOptional()
    @IsString()
    MSME_status: string;

    @IsOptional()
    @IsString()
    bank: string;

    @IsOptional()
    @IsString()
    nature_of_business: string;

    @IsOptional()
    @IsString()
    categories_of_supply: string;

    @IsOptional()
    @IsString()
    contact_person: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    fk_country_id: string;

    @IsOptional()
    @IsString()
    fk_city_id: string;

    @IsOptional()
    @IsString()
    status: string;

    @IsOptional()
    @IsString()
    notes: string;
}
