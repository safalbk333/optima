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
  strItemId: string;

  @ApiProperty({ example: 10, description: 'Quantity' })
  @IsNumber()
  intQuantity: number;
}

export class CreatePurchaseRequestDto {
  @ApiProperty({ example: 'PR-2024-001', description: 'Purchase request number' })
  @IsString()
  strRequestNumber: string;

  @ApiProperty({ example: 'Rate Contract/Non-PO', description: 'Request type' })
  @IsString()
  request_type: string;

  @ApiProperty({ example: 'Office Supplies Purchase', description: 'Request title' })
  @IsString()
  strTitle: string;

  @ApiProperty({ example: 'Need office supplies for Q1', description: 'Request description', required: false })
  @IsOptional()
  @IsString()
  strDescription?: string;

  @ApiProperty({ description: 'Current status', default: 'Pending' })
  @IsString()
  status: string;

  @ApiProperty({ example: 5000.00, description: 'Estimated value', required: false })
  @IsOptional()
  @IsNumber()
  intEstimatedValue?: number;

  @ApiProperty({ example: 'USD', description: 'Currency', required: false })
  @IsOptional()
  @IsString()
  strCurrency?: string;

  @ApiProperty({ example: 'user-id-123', description: 'Requested by user ID' })
  @IsString()
  strRequestedById: string;

  @ApiProperty({ example: 'dept-id-123', description: 'Department ID', required: false })
  @IsOptional()
  @IsString()
  strDepartmentId?: string;

  @ApiProperty({ example: 'category-id-123', description: 'Category ID', required: false })
  @IsOptional()
  @IsString()
  strCategoryId?: string;

  @ApiProperty({ example: 'user-id-123', description: 'Created by user ID', required: false })
  @IsOptional()
  @IsString()
  strCreatedId?: string;

  @ApiProperty({ 
    type: [PurchaseRequestItemDto], 
    description: 'Array of items with item ID and quantity',
    example: [{ strItemId: 'item-id-123', intQuantity: 10 }]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseRequestItemDto)
  arrItems: PurchaseRequestItemDto[];
}
