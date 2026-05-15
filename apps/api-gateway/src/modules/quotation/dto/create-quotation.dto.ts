import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateQuotationDto {
  @ApiProperty({
    description: 'ID of the vendor',
  })
  @IsString()
  vendorId: string;

  @ApiProperty({
    description: 'RFQ title of the vendor',
  })
  @IsString()
  rfqTitle: string;

  @ApiProperty({
    description: 'Category of the vendor',
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Issue date of the RFQ',
  })
  @IsDateString()
  issueDate: Date;

  @ApiProperty({
    description: 'Due date of the RFQ',
  })
  @IsDateString()
  dueDate: Date;

  @ApiProperty({
    description: 'Buyer of the vendor',
  })
  @IsString()
  buyer: string;

  @ApiProperty({
    description: 'Status of the quotation',
    default: 'Pending',
  })
  @IsString()
  status: string;
}
