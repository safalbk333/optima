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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RfqItemDto)
  arrItems?: RfqItemDto[];
}
