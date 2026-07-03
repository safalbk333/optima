import {
    IsString,
    IsBoolean,
    IsDateString,
    IsOptional,
    IsInt,
} from 'class-validator';

export class CreateVendorDto {
    @IsString()
    company_legal_name: string;

    @IsString()
    trading_name: string;

    @IsString()
    company_type: string;

    @IsInt()
    year_of_establishment: number;

    @IsString()
    office_address: string;

    @IsString()
    GST_number: string;

    @IsString()
    PAN_number: string;

    @IsString()
    MSME_status: string;

    @IsString()
    bank: string;

    @IsString()
    nature_of_business: string;

    @IsString()
    categories_of_supply: string;

    @IsString()
    contact_person: string;

    @IsString()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    fk_country_id: string;

    @IsString()
    fk_city_id: string;

    @IsString()
    status: string;
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
