import {
  IsString,
  IsOptional,
  IsDateString,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RfqItemDto {
  @IsString()
  strItemId: string;

  @IsNumber()
  intQuantity: number;
}

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

  @IsOptional()
  @IsString()
  strHtmlContent?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RfqItemDto)
  arrItems: RfqItemDto[];
}
