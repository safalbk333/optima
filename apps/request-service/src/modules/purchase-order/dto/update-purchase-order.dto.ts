import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class UpdatePurchaseOrderDto {
  @IsOptional()
  @IsString()
  strPoNumber?: string;

  @IsOptional()
  @IsString()
  strVendorId?: string;

  @IsOptional()
  @IsString()
  strQuotationId?: string;

  @IsOptional()
  @IsNumber()
  intTotalValue?: number;

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
  strModifiedId?: string;
}
