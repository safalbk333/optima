import {
    IsString,
    IsNumber,
} from 'class-validator';

export class CreateItemDto {
    @IsString()
    vendorId: string;

    @IsString()
    quotationId: string;

    @IsString()
    itemName: string;

    @IsString()
    itemCode: string;

    @IsString()
    description: string;

    @IsNumber()
    quantity: number;

    @IsString()
    unit: string;

    @IsString()
    document: string;
}
