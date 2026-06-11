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
  strVendorId: string;

  @ApiPropertyOptional({
    description: 'ID of the quotation',
  })
  @IsString()
  strQuotationId: string;

  @ApiProperty({
    description: 'Item name',
  })
  @IsString()
  strItemName: string;

  @ApiProperty({
    description: 'Item code',
  })
  @IsString()
  strItemCode: string;

  @ApiProperty({
    description: 'Item description',
  })
  @IsString()
  strDescription: string;

  @ApiProperty({
    description: 'Quantity of item',
  })
  @IsNumber()
  intQuantity: number;

  @ApiProperty({
    description: 'Unit of the item',
  })
  @IsString()
  strUnit: string;

  @ApiProperty({
    description: 'Detail document of item',
  })
  @IsString()
  strDocuments: string;
}
