import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateApprovalLevelDto {
  @IsString()
  approval_level: string;

  @Type(() => Number)
  @IsNumber()
  min_amount: number;

  @Type(() => Number)
  @IsNumber()
  max_amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  approver_roles: string[];

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class UpdateApprovalLevelDto {
  @IsString()
  approval_level: string;

  @Type(() => Number)
  @IsNumber()
  min_amount: number;

  @Type(() => Number)
  @IsNumber()
  max_amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  approver_roles: string[];

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
