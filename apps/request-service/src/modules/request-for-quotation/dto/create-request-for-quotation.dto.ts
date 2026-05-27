import {
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateRequestForQuotationDto {
  @IsString()
  strRfqCode: string;

  @IsString()
  strRfqTitle: string;

  @IsString()
  strRequestId: string;

  @IsOptional()
  @IsString()
  strEoiId?: string;

  @IsOptional()
  @IsString()
  strStatus?: string;

  @IsDateString()
  strIssueDate: string;

  @IsDateString()
  strDueDate: string;

  @IsDateString()
  strSubmissionDeadline: string;

  @IsOptional()
  @IsString()
  strNotes?: string;

  @IsOptional()
  @IsString()
  strCreatedId?: string;
}
