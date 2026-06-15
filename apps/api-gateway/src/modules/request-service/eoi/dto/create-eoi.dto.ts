import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEoiDto {
  @ApiProperty({
    description: 'EOI title',
    example: 'EOI for Office Supplies',
  })
  @IsString()
  eoi_title: string;

  @ApiProperty({
    description: 'Purchase Request ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  fk_request_id: string;

  @ApiProperty({
    description: 'Vendor ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  fk_vendor_id: string;

  @ApiPropertyOptional({
    description: 'Additional notes for the EOI',
    example: 'Please include shipping cost in your quote',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Submission deadline (ISO 8601 date string)',
    example: '2026-06-30T23:59:59Z',
  })
  @IsDateString()
  submission_deadline: string;
}
