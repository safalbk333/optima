import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateContractDto {
  @ApiProperty({ example: 'CNT-2026-001', description: 'Contract code' })
  @IsString()
  contractCode: string;

  @ApiProperty({
    description: 'Title of the contract',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Description of the contract',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Start date of the contract',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'End date of the contract',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'Value of the contract',
  })
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'ID of the vendor',
  })
  @IsString()
  vendorId: string;
}
