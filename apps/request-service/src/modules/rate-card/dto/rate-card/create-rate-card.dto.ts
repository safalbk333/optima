import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsDateString,
  IsOptional,
  MaxLength,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidToAfterValidFrom', async: false })
export class IsValidToAfterValidFromConstraint
  implements ValidatorConstraintInterface
{
  validate(valid_to: string, args: ValidationArguments) {
    const obj = args.object as CreateRateCardDto;
    if (!obj.valid_from || !valid_to) return true;
    return new Date(valid_to).getTime() > new Date(obj.valid_from).getTime();
  }

  defaultMessage() {
    return 'valid_to must be a date later than valid_from';
  }
}

export class CreateRateCardDto {
  @ApiProperty({ example: 'RC-2026-001', description: 'Unique rate card code' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  rate_card_code: string;

  @ApiProperty({ example: 'Q3 2026 Vendor Pricing' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  rate_card_name: string;

  @ApiProperty({ description: 'Vendor primary key (UUID)' })
  @IsUUID()
  @IsNotEmpty()
  fk_vendor_id: string;

  @ApiProperty({ example: '2026-07-01T00:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  valid_from: string;

  @ApiProperty({ example: '2026-12-31T23:59:59.000Z' })
  @IsDateString()
  @IsNotEmpty()
  @Validate(IsValidToAfterValidFromConstraint)
  valid_to: string;

  @ApiPropertyOptional({ example: 'Initial pricing draft for review' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  remarks?: string;
}