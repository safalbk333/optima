import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateRequestForQuotationDto {
  @ApiProperty({ example: 'RFQ-2024-001', description: 'RFQ code' })
  @IsString()
  strRfqCode: string;

  @ApiProperty({ example: 'Request for Office Supplies Quotation', description: 'RFQ title' })
  @IsString()
  strRfqTitle: string;

  @ApiProperty({ example: 'request-id-123', description: 'Purchase request ID' })
  @IsString()
  strRequestId: string;

  @ApiProperty({ example: 'eoi-id-123', description: 'Expression of Interest ID', required: false })
  @IsOptional()
  @IsString()
  strEoiId?: string;

  @ApiProperty({ example: 'DRAFT', description: 'RFQ status', required: false })
  @IsOptional()
  @IsString()
  strStatus?: string;

  @ApiProperty({ example: '2024-01-15T00:00:00Z', description: 'Issue date' })
  @IsDateString()
  strIssueDate: string;

  @ApiProperty({ example: '2024-02-15T00:00:00Z', description: 'Due date' })
  @IsDateString()
  strDueDate: string;

  @ApiProperty({ example: '2024-02-10T00:00:00Z', description: 'Submission deadline' })
  @IsDateString()
  strSubmissionDeadline: string;

  @ApiProperty({ example: 'Please submit detailed quotations', description: 'Notes', required: false })
  @IsOptional()
  @IsString()
  strNotes?: string;

  @ApiProperty({ example: 'user-id-123', description: 'Created by user ID', required: false })
  @IsOptional()
  @IsString()
  strCreatedId?: string;
}
