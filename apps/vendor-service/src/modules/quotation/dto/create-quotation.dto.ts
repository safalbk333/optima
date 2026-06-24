import {
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateQuotationDto {
  @IsString()
  title: string;

  @IsString()
  vendorId: string;

  @IsString()
  rfqId: string;

  @IsString()
  requestId: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  buyer?: string;

  @IsDateString()
  issueDate: string;

  @IsDateString()
  dueDate: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  strHtmlContent?: string;
}