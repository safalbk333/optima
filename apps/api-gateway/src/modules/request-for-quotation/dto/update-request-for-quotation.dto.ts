import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class UpdateRequestForQuotationDto {
  @ApiProperty({ example: 'Updated RFQ Title', description: 'RFQ title', required: false })
  @IsOptional()
  @IsString()
  strRfqTitle?: string;

  @ApiProperty({ example: 'eoi-id-456', description: 'Expression of Interest ID', required: false })
  @IsOptional()
  @IsString()
  strEoiId?: string;

  @ApiProperty({ example: 'PUBLISHED', description: 'RFQ status', required: false })
  @IsOptional()
  @IsString()
  strStatus?: string;

  @ApiProperty({ example: '2024-01-20T00:00:00Z', description: 'Issue date', required: false })
  @IsOptional()
  @IsDateString()
  strIssueDate?: string;

  @ApiProperty({ example: '2024-02-20T00:00:00Z', description: 'Due date', required: false })
  @IsOptional()
  @IsDateString()
  strDueDate?: string;

  @ApiProperty({ example: '2024-02-15T00:00:00Z', description: 'Submission deadline', required: false })
  @IsOptional()
  @IsDateString()
  strSubmissionDeadline?: string;

  @ApiProperty({ example: 'Updated notes', description: 'Notes', required: false })
  @IsOptional()
  @IsString()
  strNotes?: string;

  @ApiProperty({ example: 'user-id-456', description: 'Modified by user ID', required: false })
  @IsOptional()
  @IsString()
  strModifiedId?: string;
}
