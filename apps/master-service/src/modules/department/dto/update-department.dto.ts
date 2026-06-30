import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  departmentName?: string;

  @IsOptional()
  @IsString()
  departmentCode?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
