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

export class GoodsReceiptItemDto {
  @ApiPropertyOptional({ description: 'Item ID' })
  @IsOptional()
  @IsString()
  strItemId?: string;

  @ApiPropertyOptional({ description: 'Quantity ordered' })
  @IsOptional()
  @IsNumber()
  intQuantityOrdered?: number;

  @ApiPropertyOptional({ description: 'Quantity received' })
  @IsOptional()
  @IsNumber()
  intQuantityReceived?: number;

  @ApiPropertyOptional({ description: 'Quantity rejected' })
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

export class UpdateGoodsReceiptDto {
  @ApiPropertyOptional({ description: 'Status' })
  @IsOptional()
  @IsString()
  strStatus?: string;

  @ApiPropertyOptional({ description: 'Received at' })
  @IsOptional()
  @IsDateString()
  strReceivedAt?: string;

  @ApiPropertyOptional({ description: 'Delivery note number' })
  @IsOptional()
  @IsString()
  strDeliveryNoteNo?: string;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsOptional()
  @IsString()
  strNotes?: string;

  @ApiPropertyOptional({ description: 'Modified by user ID' })
  @IsOptional()
  @IsString()
  strModifiedId?: string;

  @ApiPropertyOptional({ type: [GoodsReceiptItemDto], description: 'Goods receipt items' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GoodsReceiptItemDto)
  arrItems?: GoodsReceiptItemDto[];
}
