import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsOptional,
  IsUUID,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * DTO used to validate the payload for creating a new Budget record.
 */
export class CreateBudgetDto {
  @ApiProperty({
    description: 'Unique code identifying the budget',
    example: 'BUD-2026-001',
  })
  @IsString({ message: 'budget_code must be a string' })
  @IsNotEmpty({ message: 'budget_code is required' })
  @MaxLength(50, { message: 'budget_code must not exceed 50 characters' })
  budget_code: string;

  @ApiProperty({
    description: 'Descriptive name of the budget',
    example: 'IT Infrastructure Budget',
  })
  @IsString({ message: 'budget_name must be a string' })
  @IsNotEmpty({ message: 'budget_name is required' })
  @MaxLength(150, { message: 'budget_name must not exceed 150 characters' })
  budget_name: string;

  @ApiProperty({
    description: 'Fiscal year the budget belongs to',
    example: 2026,
  })
  @IsInt({ message: 'fiscal_year must be an integer' })
  @IsNotEmpty({ message: 'fiscal_year is required' })
  @Type(() => Number)
  fiscal_year: number;

  @ApiProperty({
    description: 'Total amount allocated to this budget. Must be greater than 0',
    example: 100000,
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'allocated_amount must be a valid decimal number' })
  @IsNotEmpty({ message: 'allocated_amount is required' })
  @Min(0.01, { message: 'allocated_amount must be greater than 0' })
  @Type(() => Number)
  allocated_amount: number;

  @ApiPropertyOptional({
    description: 'Department associated with this budget (optional)',
    example: 'b3f1a2c4-1234-4a5b-9c6d-abcdef123456',
  })
  @IsOptional()
  @IsUUID('4', { message: 'fk_department_id must be a valid UUID' })
  fk_department_id?: string;
}