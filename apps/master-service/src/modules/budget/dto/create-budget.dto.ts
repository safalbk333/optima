import { IsString, IsNotEmpty, IsInt, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  @IsNotEmpty()
  strBudgetCode: string;

  @IsString()
  @IsNotEmpty()
  strBudgetName: string;

  @IsInt()
  @IsNotEmpty()
  intFiscalYear: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  numAllocatedAmount: number;

  @IsOptional()
  @IsUUID()
  strDepartmentId?: string;

  @IsOptional()
  @IsUUID()
  strCreatedById?: string;
}