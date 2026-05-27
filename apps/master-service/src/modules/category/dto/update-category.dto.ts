import {
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  strCategoryName?: string;

  @IsOptional()
  @IsBoolean()
  blnIsActive?: boolean;
}
