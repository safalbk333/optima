
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * DTO used to validate the payload for checking whether a requested
 * spend amount fits within the available balance of a budget.
 */
export class ValidateBudgetDto {
  @ApiProperty({
    description: 'Primary key of the budget to validate against',
    example: 'b3f1a2c4-1234-4a5b-9c6d-abcdef123456',
  })
  @IsUUID('4', { message: 'budgetId must be a valid UUID' })
  @IsNotEmpty({ message: 'budgetId is required' })
  budgetId: string;

  @ApiProperty({
    description: 'Amount being requested against the budget',
    example: 75000,
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'requestedAmount must be a valid decimal number' })
  @IsNotEmpty({ message: 'requestedAmount is required' })
  @Min(0.01, { message: 'requestedAmount must be greater than 0' })
  @Type(() => Number)
  requestedAmount: number;
}