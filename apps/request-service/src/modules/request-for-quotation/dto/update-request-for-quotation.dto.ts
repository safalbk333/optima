import {
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class UpdateRequestForQuotationDto {
  @IsOptional()
  @IsString()
  strRfqTitle?: string;

  @IsOptional()
  @IsString()
  strEoiId?: string;

  @IsOptional()
  @IsString()
  strStatus?: string;

  @IsOptional()
  @IsDateString()
  strIssueDate?: string;

  @IsOptional()
  @IsDateString()
  strDueDate?: string;

  @IsOptional()
  @IsDateString()
  strSubmissionDeadline?: string;

  @IsOptional()
  @IsString()
  strNotes?: string;

  @IsOptional()
  @IsString()
  strModifiedId?: string;
}
