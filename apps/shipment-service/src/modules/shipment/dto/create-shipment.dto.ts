import {
    IsString,
    IsNumber,
    IsInt,
} from 'class-validator';

export class CreateShipmentDto {
    @IsString()
    poNumber: string;

    @IsString()
    vendorId: string;

    @IsString()
    asnNumber: string;

    @IsString()
    dispatchDate: string;

    @IsString()
    deliveryDate: string;

    @IsString()
    logistics_provider: string;

    @IsString()
    tracking_no: string;

    @IsInt()
    quantity: number;

    @IsInt()
    status: number;

    @IsString()
    notes: string;
}
