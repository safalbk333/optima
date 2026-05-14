import {
    IsString,
    IsNumber,
    IsDateString,
} from 'class-validator';

export class CreateVendorDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    phone: string;
}
