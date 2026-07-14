import { IsString, IsNotEmpty, IsInt, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class UpdateBudgetDto {
  @IsUUID()
  @IsNotEmpty()
  strBudgetId: string;

  @IsOptional()
  @IsString()
  strBudgetCode?: string;

  @IsOptional()
  @IsString()
  strBudgetName?: string;

  @IsOptional()
  @IsInt()
  intFiscalYear?: number;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  numAllocatedAmount?: number;

  @IsOptional()
  @IsUUID()
  strDepartmentId?: string;

  @IsOptional()
  @IsUUID()
  strModifiedById?: string;
}