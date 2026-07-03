import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min, ValidateIf } from 'class-validator';

export class CalculatePriceDto {
  @ApiProperty({ description: 'Vendor primary key (UUID)' })
  @IsUUID()
  @IsNotEmpty()
  fk_vendor_id: string;

  @ApiProperty({ description: 'Item primary key (UUID)' })
  @IsUUID()
  @IsNotEmpty()
  fk_item_id: string;

  @ApiPropertyOptional({ example: 150, description: 'Quantity (required for FIXED/TIER pricing)' })
  @ValidateIf((o) => !o.milestone_name)
  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  @ApiPropertyOptional({ example: 'Foundation', description: 'Milestone name (required for MILESTONE pricing)' })
  @ValidateIf((o) => !o.quantity)
  @IsOptional()
  @IsString()
  milestone_name?: string;
}