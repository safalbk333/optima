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

export class GoodsReceiptItemDto {
  @ApiProperty({ description: 'Item ID' })
  @IsString()
  strItemId: string;

  @ApiProperty({ description: 'Quantity ordered' })
  @IsNumber()
  intQuantityOrdered: number;

  @ApiProperty({ description: 'Quantity received' })
  @IsNumber()
  intQuantityReceived: number;

  @ApiPropertyOptional({ description: 'Quantity rejected', default: 0 })
  @IsOptional()
  @IsNumber()
  intQuantityRejected?: number;

  @ApiPropertyOptional({ description: 'Unit of measure' })
  @IsOptional()
  @IsString()
  strUnitOfMeasure?: string;

  @ApiPropertyOptional({ description: 'Rejection reason' })
  @IsOptional()
  @IsString()
  strRejectionReason?: string;
}

export class CreateGoodsReceiptDto {
  @ApiProperty({ description: 'GRN code' })
  @IsString()
  strGrnCode: string;

  @ApiProperty({ description: 'Purchase order ID' })
  @IsString()
  strPurchaseOrderId: string;

  @ApiProperty({ description: 'Purchase request ID' })
  @IsString()
  strRequestId: string;

  @ApiProperty({ description: 'Vendor ID' })
  @IsString()
  strVendorId: string;

  @ApiPropertyOptional({ description: 'Status', default: 'PENDING' })
  @IsOptional()
  @IsString()
  strStatus?: string;

  @ApiProperty({ description: 'Received at' })
  @IsDateString()
  strReceivedAt: string;

  @ApiPropertyOptional({ description: 'Delivery note number' })
  @IsOptional()
  @IsString()
  strDeliveryNoteNo?: string;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsOptional()
  @IsString()
  strNotes?: string;

  @ApiPropertyOptional({ description: 'Created by user ID' })
  @IsOptional()
  @IsString()
  strCreatedId?: string;

  @ApiProperty({ type: [GoodsReceiptItemDto], description: 'Goods receipt items' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GoodsReceiptItemDto)
  arrItems: GoodsReceiptItemDto[];
}
