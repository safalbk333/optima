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

  @IsString()
  strItemDescription: string;

  @IsNumber()
  intQuantity: number;

  @IsOptional()
  @IsString()
  strUnitOfMeasure?: string;

  @IsNumber()
  intUnitPrice: number;

  @IsOptional()
  @IsNumber()
  intTaxPercentage?: number;

  @IsOptional()
  @IsNumber()
  intTaxAmount?: number;

  @IsNumber()
  intTotalPrice: number;

  @IsOptional()
  @IsString()
  strCurrency?: string;

  @IsOptional()
  @IsString()
  strNotes?: string;
}

export class CreateQuotationDto {
  @IsString()
  strVendorId: string;

  @IsString()
  strRfqId: string;

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

  @IsDateString()
  strIssueDate: string;

  @IsDateString()
  strDueDate: string;

  @IsOptional()
  @IsString()
  strNotes?: string;

  @IsOptional()
  @IsString()
  strCreatedId?: string;

  @IsOptional()
  @IsString()
  strHtmlContent?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuotationItemDto)
  arrItems?: QuotationItemDto[];
}
