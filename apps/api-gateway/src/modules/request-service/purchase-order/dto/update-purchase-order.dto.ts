import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePurchaseOrderDto {
    @ApiPropertyOptional({ description: 'PO number' })
    @IsOptional()
    @IsString()
    strPoNumber: string;

    @ApiPropertyOptional({ description: 'Vendor Id' })
    @IsOptional()
    @IsString()
    strVendorId?: string;

    @ApiPropertyOptional({ description: 'Quotation Id' })
    @IsOptional()
    @IsString()
    strQuotationId?: string;

    @ApiPropertyOptional({ description: 'Total price' })
    @IsOptional()
    @IsNumber()
    intTotalValue?: number;

    @ApiPropertyOptional({ description: 'Delivery address' })
    @IsOptional()
    @IsString()
    strDeliveryAddress?: string;

    @ApiPropertyOptional({ description: 'Expected Delivery date' })
    @IsOptional()
    @IsDateString()
    strExpectedDelivery?: string;
}