import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateVendorDto {
  @ApiProperty({
    description: 'Name of the vendor',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email of the vendor',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Phone number of the vendor',
  })
  @IsString()
  phone: string;
}
