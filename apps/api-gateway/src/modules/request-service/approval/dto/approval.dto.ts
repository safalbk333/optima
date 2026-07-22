import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateApprovalLevelDto {
  @ApiProperty({ description: 'Approval level name' })
  @IsString()
  approval_level: string;

  @ApiProperty({ description: 'Minimum Amount' })
  @Type(() => Number)
  @IsNumber()
  min_amount: number;

  @ApiProperty({ description: 'Maximum Amount' })
  @Type(() => Number)
  @IsNumber()
  max_amount: number;

  @ApiProperty({ description: 'Request description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: [String],
    example: ['HEAD_PROCUREMENT', 'FINANCE_MANAGER'],
    description: 'Approver roles'
  })
  @IsArray()
  @IsString({ each: true })
  approver_roles: string[];
}

export class UpdateApprovalLevelDto {
  @ApiPropertyOptional({ description: 'Approval level name', })
  @IsOptional()
  @IsString()
  approval_level?: string;

  @ApiPropertyOptional({ description: 'Minimum Amount' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  min_amount?: number;

  @ApiPropertyOptional({ description: 'Maximum Amount' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  max_amount?: number;

  @ApiPropertyOptional({ description: 'Description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ type: [String],description: 'Approver roles' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  approver_roles?: string[];

  @ApiPropertyOptional({ description: 'Is active' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
