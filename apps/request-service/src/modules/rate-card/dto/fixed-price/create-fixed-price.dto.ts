import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateFixedPriceDto {
  @ApiProperty({ example: 250.0, description: 'Unit price for the item' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  unit_price: number;
}