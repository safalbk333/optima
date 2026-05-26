import {
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEoiDto {
  @ApiPropertyOptional({
    description: 'EOI title',
    example: 'EOI for Office Supplies - Updated',
  })
  @IsOptional()
  @IsString()
  chr_eoi_title?: string;

  @ApiPropertyOptional({
    description: 'Additional notes for the EOI',
    example: 'Updated notes with new requirements',
  })
  @IsOptional()
  @IsString()
  txt_notes?: string;

  @ApiPropertyOptional({
    description: 'Submission deadline (ISO 8601 date string)',
    example: '2026-07-15T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  dt_submission_deadline?: string;
}
