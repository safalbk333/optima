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

    @IsDateString()
    year_of_establishment: string;

    @IsString()
    office_address: string;

    @IsString()
    GST_number: string;

    @IsString()
    PAN_number: string;

    @IsString()
    MSME_status: string;

    @IsInt()
    bank: number;

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
