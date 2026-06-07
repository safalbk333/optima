import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNumber,
  IsDateString,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreateShipmentDto {
  @ApiProperty({
    description: 'Purchase Order number',
  })
  @IsString()
  poNumber: string;

  @ApiProperty({
    description: 'ID of the vendor',
  })
  @IsString()
  vendorId: string;

  @ApiProperty({
    description: 'ASN number',
  })
  @IsString()
  asnNumber: string;

  @ApiProperty({
    description: 'Dispatch date',
  })
  @IsDateString()
  dispatchDate: Date;

  @ApiProperty({
    description: 'Delivery date',
  })
  @IsDateString()
  deliveryDate: Date;

  @ApiProperty({
    description: 'Provider',
  })
  @IsString()
  logistics_provider: string;

  @ApiProperty({
    description: 'Shipment tracking number',
  })
  @IsString()
  tracking_no: string;

  @ApiProperty({
    description: 'Item quantity',
  })
  @IsInt()
  quantity: number;

  @ApiProperty({
    description: 'ASN notes',
  })
  @IsString()
  notes: string;

  @ApiPropertyOptional({
    description: 'Status', default: 1,
  })
  @IsOptional()
  @IsInt()
  status?: number;
}
