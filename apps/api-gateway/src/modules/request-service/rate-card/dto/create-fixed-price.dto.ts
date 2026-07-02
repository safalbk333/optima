import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateFixedPriceDto {
  @ApiProperty({
    description: 'Unit price for the rate card item',
    example: 250.5,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  unit_price: number;
}