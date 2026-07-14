import {
  IsString,
  IsNumber,
  IsInt,
  IsOptional,
  IsUUID,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * DTO used to validate the payload for updating an existing Budget record.
 * All fields are optional to support partial updates, but when present
 * they must satisfy the same constraints as creation.
 */
export class UpdateBudgetDto {
  @ApiPropertyOptional({
    description: 'Unique code identifying the budget',
    example: 'BUD-2026-001',
  })
  @IsOptional()
  @IsString({ message: 'budget_code must be a string' })
  @MaxLength(50, { message: 'budget_code must not exceed 50 characters' })
  budget_code?: string;

  @ApiPropertyOptional({
    description: 'Descriptive name of the budget',
    example: 'IT Infrastructure Budget',
  })
  @IsOptional()
  @IsString({ message: 'budget_name must be a string' })
  @MaxLength(150, { message: 'budget_name must not exceed 150 characters' })
  budget_name?: string;

  @ApiPropertyOptional({
    description: 'Fiscal year the budget belongs to',
    example: 2026,
  })
  @IsOptional()
  @IsInt({ message: 'fiscal_year must be an integer' })
  @Type(() => Number)
  fiscal_year?: number;

  @ApiPropertyOptional({
    description:
      'Total amount allocated to this budget. Cannot be set below consumed_amount',
    example: 120000,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'allocated_amount must be a valid decimal number' })
  @Min(0.01, { message: 'allocated_amount must be greater than 0' })
  @Type(() => Number)
  allocated_amount?: number;

  @ApiPropertyOptional({
    description: 'Department associated with this budget',
    example: 'b3f1a2c4-1234-4a5b-9c6d-abcdef123456',
  })
  @IsOptional()
  @IsUUID('4', { message: 'fk_department_id must be a valid UUID' })
  fk_department_id?: string;
}