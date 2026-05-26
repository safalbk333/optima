import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UpdatePurchaseRequestDto {
  @ApiProperty({ example: 'Updated Office Supplies Purchase', description: 'Request title', required: false })
  @IsOptional()
  @IsString()
  chr_title?: string;

  @ApiProperty({ example: 'Updated description', description: 'Request description', required: false })
  @IsOptional()
  @IsString()
  txt_description?: string;

  @ApiProperty({ example: 'status-id-456', description: 'Current status ID', required: false })
  @IsOptional()
  @IsString()
  fk_chr_current_status_id?: string;

  @ApiProperty({ example: 'priority-id-456', description: 'Priority ID', required: false })
  @IsOptional()
  @IsString()
  fk_chr_priority_id?: string;

  @ApiProperty({ example: 6000.00, description: 'Estimated value', required: false })
  @IsOptional()
  @IsNumber()
  flt_estimated_value?: number;

  @ApiProperty({ example: 'USD', description: 'Currency', required: false })
  @IsOptional()
  @IsString()
  chr_currency?: string;

  @ApiProperty({ example: 'dept-id-456', description: 'Department ID', required: false })
  @IsOptional()
  @IsString()
  fk_chr_department_id?: string;

  @ApiProperty({ example: 'category-id-456', description: 'Category ID', required: false })
  @IsOptional()
  @IsString()
  fk_chr_category_id?: string;

  @ApiProperty({ example: 'user-id-456', description: 'Modified by user ID', required: false })
  @IsOptional()
  @IsString()
  fk_chr_modified_id?: string;
}
