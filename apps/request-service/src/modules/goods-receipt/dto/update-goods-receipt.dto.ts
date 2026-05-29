import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GoodsReceiptItemDto {
  @IsOptional()
  @IsString()
  strItemId?: string;

  @IsOptional()
  @IsNumber()
  intQuantityOrdered?: number;

  @IsOptional()
  @IsNumber()
  intQuantityReceived?: number;

  @IsOptional()
  @IsNumber()
  intQuantityRejected?: number;

  @IsOptional()
  @IsString()
  strUnitOfMeasure?: string;

  @IsOptional()
  @IsString()
  strRejectionReason?: string;
}

export class UpdateGoodsReceiptDto {
  @IsOptional()
  @IsString()
  strStatus?: string;

  @IsOptional()
  @IsDateString()
  strReceivedAt?: string;

  @IsOptional()
  @IsString()
  strDeliveryNoteNo?: string;

  @IsOptional()
  @IsString()
  strNotes?: string;

  @IsOptional()
  @IsString()
  strModifiedId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GoodsReceiptItemDto)
  arrItems?: GoodsReceiptItemDto[];
}
