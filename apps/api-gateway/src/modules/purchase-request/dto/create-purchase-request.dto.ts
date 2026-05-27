import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PurchaseRequestItemDto {
  @ApiProperty({ example: 'item-id-123', description: 'Item ID' })
  @IsString()
  fk_chr_item_id: string;

  @ApiProperty({ example: 10, description: 'Quantity' })
  @IsNumber()
  int_quantity: number;
}

export class CreatePurchaseRequestDto {
  @ApiProperty({ example: 'PR-2024-001', description: 'Purchase request number' })
  @IsString()
  chr_request_number: string;

  @ApiProperty({ example: 'Office Supplies Purchase', description: 'Request title' })
  @IsString()
  chr_title: string;

  @ApiProperty({ example: 'Need office supplies for Q1', description: 'Request description', required: false })
  @IsOptional()
  @IsString()
  txt_description?: string;

  @ApiProperty({ example: 'status-id-123', description: 'Current status ID' })
  @IsString()
  fk_chr_current_status_id: string;

  @ApiProperty({ example: 'priority-id-123', description: 'Priority ID' })
  @IsString()
  fk_chr_priority_id: string;

  @ApiProperty({ example: 5000.00, description: 'Estimated value', required: false })
  @IsOptional()
  @IsNumber()
  flt_estimated_value?: number;

  @ApiProperty({ example: 'USD', description: 'Currency', required: false })
  @IsOptional()
  @IsString()
  chr_currency?: string;

  @ApiProperty({ example: 'user-id-123', description: 'Requested by user ID' })
  @IsString()
  fk_chr_requested_by_id: string;

  @ApiProperty({ example: 'dept-id-123', description: 'Department ID', required: false })
  @IsOptional()
  @IsString()
  fk_chr_department_id?: string;

  @ApiProperty({ example: 'category-id-123', description: 'Category ID', required: false })
  @IsOptional()
  @IsString()
  fk_chr_category_id?: string;

  @ApiProperty({ example: 'user-id-123', description: 'Created by user ID', required: false })
  @IsOptional()
  @IsString()
  fk_chr_created_id?: string;

  @ApiProperty({ 
    type: [PurchaseRequestItemDto], 
    description: 'Array of items with item ID and quantity',
    example: [{ fk_chr_item_id: 'item-id-123', int_quantity: 10 }]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseRequestItemDto)
  items: PurchaseRequestItemDto[];
}
