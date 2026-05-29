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
  @IsString()
  strItemId: string;

  @IsNumber()
  intQuantityOrdered: number;

  @IsNumber()
  intQuantityReceived: number;

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

export class CreateGoodsReceiptDto {
  @IsString()
  strGrnCode: string;

  @IsString()
  strPurchaseOrderId: string;

  @IsString()
  strRequestId: string;

  @IsString()
  strVendorId: string;

  @IsOptional()
  @IsString()
  strStatus?: string;

  @IsDateString()
  strReceivedAt: string;

  @IsOptional()
  @IsString()
  strDeliveryNoteNo?: string;

  @IsOptional()
  @IsString()
  strNotes?: string;

  @IsOptional()
  @IsString()
  strCreatedId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GoodsReceiptItemDto)
  arrItems: GoodsReceiptItemDto[];
}
