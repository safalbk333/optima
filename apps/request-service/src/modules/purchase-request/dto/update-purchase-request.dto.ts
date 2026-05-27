import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PurchaseRequestItemDto {
  @IsString()
  strItemId: string;

  @IsNumber()
  intQuantity: number;
}

export class UpdatePurchaseRequestDto {
  @IsOptional()
  @IsString()
  strTitle?: string;

  @IsOptional()
  @IsString()
  strDescription?: string;

  @IsOptional()
  @IsString()
  strCurrentStatusId?: string;

  @IsOptional()
  @IsString()
  strPriorityId?: string;

  @IsOptional()
  @IsNumber()
  intEstimatedValue?: number;

  @IsOptional()
  @IsString()
  strCurrency?: string;

  @IsOptional()
  @IsString()
  strDepartmentId?: string;

  @IsOptional()
  @IsString()
  strCategoryId?: string;

  @IsOptional()
  @IsString()
  strModifiedId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseRequestItemDto)
  arrItems?: PurchaseRequestItemDto[];
}
