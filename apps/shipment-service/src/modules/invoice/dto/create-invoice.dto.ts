import {
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  chr_invoice_number: string;

  @IsString()
  fk_chr_purchase_order_id: string;

  @IsOptional()
  @IsString()
  fk_chr_goods_receipt_id?: string;

  @IsString()
  fk_chr_request_id: string;

  @IsString()
  fk_chr_vendor_id: string;

  @IsNumber()
  flt_subtotal: number;

  @IsOptional()
  @IsNumber()
  flt_tax_amount?: number;

  @IsNumber()
  flt_total_amount: number;

  @IsOptional()
  @IsString()
  chr_currency?: string;

  @IsDateString()
  dt_invoice_date: Date;

  @IsDateString()
  dt_due_date: Date;

  @IsOptional()
  @IsString()
  txt_notes?: string;
}