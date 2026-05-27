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

export class CreatePurchaseRequestDto {
  @IsString()
  strRequestNumber: string;

  @IsString()
  strTitle: string;

  @IsOptional()
  @IsString()
  strDescription?: string;

  @IsString()
  strCurrentStatusId: string;

  @IsString()
  strPriorityId: string;

  @IsOptional()
  @IsNumber()
  intEstimatedValue?: number;

  @IsOptional()
  @IsString()
  strCurrency?: string;

  @IsString()
  strRequestedById: string;

  @IsOptional()
  @IsString()
  strDepartmentId?: string;

  @IsOptional()
  @IsString()
  strCategoryId?: string;

  @IsOptional()
  @IsString()
  strCreatedId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseRequestItemDto)
  arrItems: PurchaseRequestItemDto[];
}
