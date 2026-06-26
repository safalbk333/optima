import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  strCategoryName: string;

  @IsOptional()
  @IsUUID()
  strParentCategoryId?: string;
}