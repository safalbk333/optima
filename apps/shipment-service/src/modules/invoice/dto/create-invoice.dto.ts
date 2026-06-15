import {
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  invoice_number: string;

  @IsString()
  fk_purchase_order_id: string;

  @IsOptional()
  @IsString()
  fk_goods_receipt_id?: string;

  @IsString()
  fk_request_id: string;

  @IsString()
  fk_vendor_id: string;

  @IsNumber()
  subtotal: number;

  @IsOptional()
  @IsNumber()
  tax_amount?: number;

  @IsNumber()
  total_amount: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsDateString()
  invoice_date: Date;

  @IsDateString()
  due_date: Date;

  @IsOptional()
  @IsString()
  notes?: string;
}