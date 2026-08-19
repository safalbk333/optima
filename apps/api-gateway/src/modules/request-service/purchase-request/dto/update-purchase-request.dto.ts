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

export class UpdatePurchaseRequestDto {
  @ApiProperty({ example: 'Purchase request type', description: 'Request type', required: false })
  @IsOptional()
  @IsString()
  request_type?: string;

  @ApiProperty({ example: 'Updated Office Supplies Purchase', description: 'Request title', required: false })
  @IsOptional()
  @IsString()
  strTitle?: string;

  @ApiProperty({ example: 'Updated description', description: 'Request description', required: false })
  @IsOptional()
  @IsString()
  strDescription?: string;

  @ApiProperty({ example: 'status-id-456', description: 'Current status ID', required: false })
  @IsOptional()
  @IsString()
  strCurrentStatusId?: string;

  @ApiProperty({ example: 'priority-id-456', description: 'Priority ID', required: false })
  @IsOptional()
  @IsString()
  strPriorityId?: string;

  @ApiProperty({ example: 6000.00, description: 'Estimated value', required: false })
  @IsOptional()
  @IsNumber()
  intEstimatedValue?: number;

  @ApiProperty({ example: 'USD', description: 'Currency', required: false })
  @IsOptional()
  @IsString()
  strCurrency?: string;

  @ApiProperty({ example: 'dept-id-456', description: 'Department ID', required: false })
  @IsOptional()
  @IsString()
  strDepartmentId?: string;

  @ApiProperty({ example: 'category-id-456', description: 'Category ID', required: false })
  @IsOptional()
  @IsString()
  strCategoryId?: string;

  @ApiProperty({ example: 'user-id-456', description: 'Modified by user ID', required: false })
  @IsOptional()
  @IsString()
  strModifiedId?: string;

  @ApiProperty({ 
    type: [PurchaseRequestItemDto], 
    description: 'Array of items with item ID and quantity',
    example: [{ strItemId: 'item-id-123', intQuantity: 15 }],
    required: false
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseRequestItemDto)
  arrItems?: PurchaseRequestItemDto[];
}
