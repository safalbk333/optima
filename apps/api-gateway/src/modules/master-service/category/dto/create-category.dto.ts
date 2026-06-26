import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Display name of the category',
    example: 'Office Supplies',
  })
  @IsString()
  @IsNotEmpty()
  strCategoryName: string;

  @ApiPropertyOptional({
    description:
      'UUID of the parent category. Omit to create a root-level category.',
    example: '3f6b1c2d-4e5a-4b7c-8d9e-0f1a2b3c4d5e',
  })
  @IsOptional()
  @IsUUID()
  strParentCategoryId?: string;
}