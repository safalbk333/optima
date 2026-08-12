import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateQuotationItemDto {
  @ApiPropertyOptional({ description: 'Item ID from tbl_item' })
  @IsOptional()
  @IsString()
  strItemId?: string;

  @ApiPropertyOptional({ description: 'Item description' })
  @IsOptional()
  @IsString()
  strItemDescription?: string;

  @ApiPropertyOptional({ description: 'Quantity' })
  @IsOptional()
  @IsNumber()
  intQuantity?: number;

  @ApiPropertyOptional({ description: 'Unit of measure' })
  @IsOptional()
  @IsString()
  strUnitOfMeasure?: string;

  @ApiPropertyOptional({ description: 'Unit price' })
  @IsOptional()
  @IsNumber()
  intUnitPrice?: number;

  @ApiPropertyOptional({ description: 'Tax percentage' })
  @IsOptional()
  @IsNumber()
  intTaxPercentage?: number;

  @ApiPropertyOptional({ description: 'Tax amount' })
  @IsOptional()
  @IsNumber()
  intTaxAmount?: number;

  @ApiPropertyOptional({ description: 'Total price' })
  @IsOptional()
  @IsNumber()
  intTotalPrice?: number;

  @ApiPropertyOptional({ description: 'Currency' })
  @IsOptional()
  @IsString()
  strCurrency?: string;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsOptional()
  @IsString()
  strNotes?: string;
}

export class UpdateQuotationDto {
  @ApiPropertyOptional({ description: 'Vendor ID' })
  @IsOptional()
  @IsString()
  strVendorId?: string;

  @ApiPropertyOptional({ description: 'Category ID' })
  @IsOptional()
  @IsString()
  strCategoryId?: string;

  @ApiPropertyOptional({ description: 'Buyer user ID' })
  @IsOptional()
  @IsString()
  strBuyerId?: string;

  @ApiPropertyOptional({ description: 'Buyer details' })
  @IsOptional()
  @IsString()
  strBuyerDetails?: string;

  @ApiPropertyOptional({ description: 'Seller details' })
  @IsOptional()
  @IsString()
  strSellerDetails?: string;

  @ApiPropertyOptional({ description: 'Status', example: 'DRAFT' })
  @IsOptional()
  @IsString()
  strStatus?: string;

  @ApiPropertyOptional({ description: 'Total amount' })
  @IsOptional()
  @IsNumber()
  intTotalAmount?: number;

  @ApiPropertyOptional({ description: 'Currency', default: 'USD' })
  @IsOptional()
  @IsString()
  strCurrency?: string;

  @ApiPropertyOptional({ description: 'Issue date' })
  @IsOptional()
  @IsDateString()
  strIssueDate?: string;

  @ApiPropertyOptional({ description: 'Due date' })
  @IsOptional()
  @IsDateString()
  strDueDate?: string;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsOptional()
  @IsString()
  strNotes?: string;

  @ApiPropertyOptional({ description: 'Modified by user ID' })
  @IsOptional()
  @IsString()
  strModifiedId?: string;

  @ApiPropertyOptional({ type: [UpdateQuotationItemDto], description: 'Quotation items' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuotationItemDto)
  arrItems?: UpdateQuotationItemDto[];
}
