import {
    IsString,
    IsNumber,
} from 'class-validator';

export class CreateQuotationDto {
    @IsString()
    vendorId: string;

    @IsString()
    rfqNo?: string;

    @IsString()
    rfqTitle: string;

    @IsString()
    category: string;

    @IsString()
    issueDate: string;

    @IsString()
    dueDate: string;

    @IsString()
    buyer: string;

    @IsString()
    status: string;
}
