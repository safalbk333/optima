import { IsUUID, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class ValidateBudgetDto {
  @IsUUID()
  @IsNotEmpty()
  strBudgetId: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  numRequestedAmount: number;
}