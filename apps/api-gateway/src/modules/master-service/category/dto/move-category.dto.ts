import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class MoveCategoryDto {
  @ApiPropertyOptional({
    description:
      'UUID of the new parent category. ' +
      'Pass null (or omit) to promote the node to root level.',
    example: '3f6b1c2d-4e5a-4b7c-8d9e-0f1a2b3c4d5e',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  strNewParentCategoryId?: string | null;
}