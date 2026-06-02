import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class QuotationItemDto {
  @IsOptional()
  @IsString()
  strItemId?: string;

  @IsOptional()
  @IsString()
  strVendorItemId?: string;

  @IsOptional()
  @IsString()
  strItemDescription?: string;

  @IsOptional()
  @IsNumber()
  intQuantity?: number;

  @IsOptional()
  @IsString()
  strUnitOfMeasure?: string;

  @IsOptional()
  @IsNumber()
  intUnitPrice?: number;

  @IsOptional()
  @IsNumber()
  intTaxPercentage?: number;

  @IsOptional()
  @IsNumber()
  intTaxAmount?: number;

  @IsOptional()
  @IsNumber()
  intTotalPrice?: number;

  @IsOptional()
  @IsString()
  strCurrency?: string;

  @IsOptional()
  @IsDateString()
  dtDeliveryLeadTime?: string;

  @IsOptional()
  @IsString()
  strNotes?: string;
}

export class UpdateQuotationDto {
  @IsOptional()
  @IsString()
  strVendorId?: string;

  @IsOptional()
  @IsString()
  strCategoryId?: string;

  @IsOptional()
  @IsString()
  strBuyerId?: string;

  @IsOptional()
  @IsString()
  strBuyerDetails?: string;

  @IsOptional()
  @IsString()
  strSellerDetails?: string;

  @IsOptional()
  @IsString()
  strStatus?: string;

  @IsOptional()
  @IsNumber()
  intTotalAmount?: number;

  @IsOptional()
  @IsString()
  strCurrency?: string;

  @IsOptional()
  @IsDateString()
  strIssueDate?: string;

  @IsOptional()
  @IsDateString()
  strDueDate?: string;

  @IsOptional()
  @IsString()
  strNotes?: string;

  @IsOptional()
  @IsString()
  strModifiedId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuotationItemDto)
  arrItems?: QuotationItemDto[];
}
