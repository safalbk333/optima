import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    description: 'New display name for the category',
    example: 'Stationery',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  strCategoryName?: string;

  @ApiPropertyOptional({
    description: 'Set to false to deactivate the category',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  blnIsActive?: boolean;
}