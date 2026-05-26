import {
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  categoryName?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
