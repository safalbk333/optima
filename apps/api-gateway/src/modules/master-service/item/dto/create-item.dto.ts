import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateItemDto {
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
    description: 'Item category Id',
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    description: 'Item description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Unit of the item',
  })
  @IsString()
  unit: string;

  @ApiProperty({
    description: 'Item HSN code',
  })
  @IsString()
  hsnCode: string;

  @ApiProperty({
    description: 'Item is Rate contract item or not',
  })
  @IsBoolean()
  rcFlag: boolean;

  @ApiProperty({
    description: 'Detail document of item',
  })
  @IsString()
  documents: string;
}

export class UpdateItemDto {
  @ApiPropertyOptional({ description: 'Item name', })
  @IsOptional()
  @IsString()
  itemName: string;

  @ApiPropertyOptional({ description: 'Item code', })
  @IsOptional()
  @IsString()
  itemCode: string;

  @ApiPropertyOptional({ description: 'Item category Id', })
  @IsOptional()
  @IsString()
  categoryId: string;

  @ApiPropertyOptional({
    description: 'Item description',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'Unit of the item',
  })
  @IsOptional()
  @IsString()
  unit: string;

  @ApiPropertyOptional({
    description: 'Item HSN code',
  })
  @IsOptional()
  @IsString()
  hsnCode: string;

  @ApiPropertyOptional({
    description: 'Item is Rate contract item or not',
  })
  @IsOptional()
  @IsBoolean()
  rcFlag: boolean;

  @ApiPropertyOptional({
    description: 'Detail document of item',
  })
  @IsOptional()
  @IsString()
  documents: string;

  @ApiPropertyOptional({
    description: 'Item active or not',
  })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
