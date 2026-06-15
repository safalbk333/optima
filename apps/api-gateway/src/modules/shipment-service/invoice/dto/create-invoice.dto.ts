import {
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInvoiceDto {
  @ApiProperty({
    description: 'Invoice number',
    example: 'INV-2026-001',
  })
  @IsString()
  invoice_number: string;

  @ApiProperty({
    description: 'Purchase order ID (Foreign Key)',
    example: 'po-123456',
  })
  @IsString()
  fk_purchase_order_id: string;

  @ApiPropertyOptional({
    description: 'Goods receipt ID (Foreign Key)',
    example: 'gr-789456',
  })
  @IsOptional()
  @IsString()
  fk_goods_receipt_id?: string;

  @ApiProperty({
    description: 'Request ID (Foreign Key)',
    example: 'req-123456',
  })
  @IsString()
  fk_request_id: string;

  @ApiProperty({
    description: 'Vendor ID (Foreign Key)',
    example: 'vendor-001',
  })
  @IsString()
  fk_vendor_id: string;

  @ApiProperty({
    description: 'Subtotal amount',
    example: 1000.00,
    type: Number,
  })
  @IsNumber()
  subtotal: number;

  @ApiPropertyOptional({
    description: 'Tax amount',
    example: 150.00,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  tax_amount?: number;

  @ApiProperty({
    description: 'Total amount',
    example: 1150.00,
    type: Number,
  })
  @IsNumber()
  total_amount: number;

  @ApiPropertyOptional({
    description: 'Currency code',
    example: 'USD',
  })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({
    description: 'Invoice date (ISO 8601 format)',
    example: '2026-06-04T00:00:00Z',
  })
  @IsDateString()
  invoice_date: Date;

  @ApiProperty({
    description: 'Due date (ISO 8601 format)',
    example: '2026-07-04T00:00:00Z',
  })
  @IsDateString()
  due_date: Date;

  @ApiPropertyOptional({
    description: 'Additional notes',
    example: 'Payment terms: Net 30',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
