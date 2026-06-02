import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreatePurchaseOrderDto {
  @IsString()
  strRequestId: string;

  @IsString()
  strPoNumber: string;

  @IsString()
  strVendorId: string;

  @IsString()
  strQuotationId: string;

  @IsNumber()
  intTotalValue: number;

  @IsOptional()
  @IsString()
  strCurrency?: string;

  @IsOptional()
  @IsDateString()
  strIssuedAt?: string;

  @IsOptional()
  @IsString()
  strDeliveryAddress?: string;

  @IsOptional()
  @IsDateString()
  strExpectedDelivery?: string;

  @IsOptional()
  @IsString()
  strCreatedId?: string;
}
