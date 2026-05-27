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
  fk_chr_item_id: string;

  @IsNumber()
  int_quantity: number;
}

export class CreatePurchaseRequestDto {
  @IsString()
  chr_request_number: string;

  @IsString()
  chr_title: string;

  @IsOptional()
  @IsString()
  txt_description?: string;

  @IsString()
  fk_chr_current_status_id: string;

  @IsString()
  fk_chr_priority_id: string;

  @IsOptional()
  @IsNumber()
  flt_estimated_value?: number;

  @IsOptional()
  @IsString()
  chr_currency?: string;

  @IsString()
  fk_chr_requested_by_id: string;

  @IsOptional()
  @IsString()
  fk_chr_department_id?: string;

  @IsOptional()
  @IsString()
  fk_chr_category_id?: string;

  @IsOptional()
  @IsString()
  fk_chr_created_id?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseRequestItemDto)
  items: PurchaseRequestItemDto[];
}
