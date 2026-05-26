import {
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UpdatePurchaseRequestDto {
  @IsOptional()
  @IsString()
  chr_title?: string;

  @IsOptional()
  @IsString()
  txt_description?: string;

  @IsOptional()
  @IsString()
  fk_chr_current_status_id?: string;

  @IsOptional()
  @IsString()
  fk_chr_priority_id?: string;

  @IsOptional()
  @IsNumber()
  flt_estimated_value?: number;

  @IsOptional()
  @IsString()
  chr_currency?: string;

  @IsOptional()
  @IsString()
  fk_chr_department_id?: string;

  @IsOptional()
  @IsString()
  fk_chr_category_id?: string;

  @IsOptional()
  @IsString()
  fk_chr_modified_id?: string;
}
