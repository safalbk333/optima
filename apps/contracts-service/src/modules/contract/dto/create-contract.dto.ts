import {
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateContractDto {
  @IsString()
  contractCode: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  value: number;

  @IsString()
  vendorId: string;

  @IsOptional()
  @IsString()
  strHtmlContent?: string;
}
