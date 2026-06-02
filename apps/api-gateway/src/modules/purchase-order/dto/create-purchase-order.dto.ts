import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreatePurchaseOrderDto {
  @ApiProperty({ description: 'Purchase request ID' })
  @IsString()
  strRequestId: string;

  @ApiProperty({ description: 'PO number' })
  @IsString()
  strPoNumber: string;

  @ApiProperty({ description: 'Vendor ID' })
  @IsString()
  strVendorId: string;

  @ApiProperty({ description: 'Quotation ID' })
  @IsString()
  strQuotationId: string;

  @ApiProperty({ description: 'Total value' })
  @IsNumber()
  intTotalValue: number;

  @ApiPropertyOptional({ description: 'Currency', default: 'USD' })
  @IsOptional()
  @IsString()
  strCurrency?: string;

  @ApiPropertyOptional({ description: 'Issued at' })
  @IsOptional()
  @IsDateString()
  strIssuedAt?: string;

  @ApiPropertyOptional({ description: 'Delivery address' })
  @IsOptional()
  @IsString()
  strDeliveryAddress?: string;

  @ApiPropertyOptional({ description: 'Expected delivery date' })
  @IsOptional()
  @IsDateString()
  strExpectedDelivery?: string;

  @ApiPropertyOptional({ description: 'Created by user ID' })
  @IsOptional()
  @IsString()
  strCreatedId?: string;
}
