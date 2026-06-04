import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class QuotationItemDto {
  @ApiPropertyOptional({ description: 'Vendor item ID' })
  @IsOptional()
  @IsString()
  strVendorItemId?: string;

  @ApiProperty({ description: 'Item description' })
  @IsString()
  strItemDescription: string;

  @ApiProperty({ description: 'Quantity' })
  @IsNumber()
  intQuantity: number;

  @ApiPropertyOptional({ description: 'Unit of measure' })
  @IsOptional()
  @IsString()
  strUnitOfMeasure?: string;

  @ApiProperty({ description: 'Unit price' })
  @IsNumber()
  intUnitPrice: number;

  @ApiPropertyOptional({ description: 'Tax percentage' })
  @IsOptional()
  @IsNumber()
  intTaxPercentage?: number;

  @ApiPropertyOptional({ description: 'Tax amount' })
  @IsOptional()
  @IsNumber()
  intTaxAmount?: number;

  @ApiProperty({ description: 'Total price' })
  @IsNumber()
  intTotalPrice: number;

  @ApiPropertyOptional({ description: 'Currency' })
  @IsOptional()
  @IsString()
  strCurrency?: string;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsOptional()
  @IsString()
  strNotes?: string;
}

export class CreateQuotationDto {
  @ApiProperty({ description: 'Vendor ID' })
  @IsString()
  strVendorId: string;

  @ApiProperty({ description: 'RFQ ID' })
  @IsString()
  strRfqId: string;


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

  @ApiPropertyOptional({ description: 'Status', default: 'DRAFT' })
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

  @ApiProperty({ description: 'Issue date' })
  @IsDateString()
  strIssueDate: string;

  @ApiProperty({ description: 'Due date' })
  @IsDateString()
  strDueDate: string;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsOptional()
  @IsString()
  strNotes?: string;

  @ApiPropertyOptional({ type: [QuotationItemDto], description: 'Quotation items' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuotationItemDto)
  arrItems?: QuotationItemDto[];

  @ApiPropertyOptional({ description: 'HTML content to render' })
  @IsOptional()
  @IsString()
  strHtmlContent?: string;
}
