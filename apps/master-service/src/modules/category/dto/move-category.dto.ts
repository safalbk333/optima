import { IsOptional, IsUUID } from 'class-validator';

export class MoveCategoryDto {
  /**
   * The new parent's ID.
   * Pass null (or omit) to promote the node to a root category.
   */
  @IsOptional()
  @IsUUID()
  strNewParentCategoryId?: string | null;
}