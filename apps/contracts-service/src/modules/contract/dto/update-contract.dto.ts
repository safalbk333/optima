import {
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdateContractDto {
  @IsOptional()
  @IsString()
  contractCode?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsString()
  vendorId?: string;
}
