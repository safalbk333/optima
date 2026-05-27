import {
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    description: 'Name of the category',
  })
  @IsOptional()
  @IsString()
  strCategoryName?: string;

  @ApiPropertyOptional({
    description: 'Whether the category is active',
  })
  @IsOptional()
  @IsBoolean()
  blnIsActive?: boolean;
}
