import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    description: 'ID of the vendor',
  })
  @IsString()
  vendorId: string;

  @ApiPropertyOptional({
    description: 'ID of the quotation',
  })
  @IsString()
  quotationId: string;

  @ApiProperty({
    description: 'Item name',
  })
  @IsString()
  itemName: string;

  @ApiProperty({
    description: 'Item code',
  })
  @IsString()
  itemCode: string;

  @ApiProperty({
    description: 'Item description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Quantity of item',
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Unit of the item',
  })
  @IsString()
  unit: string;

  @ApiProperty({
    description: 'Detail document of item',
  })
  @IsString()
  documents: string;
}
