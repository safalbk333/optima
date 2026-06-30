import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  currencyName: string;

  @IsString()
  currencyCode: string;

  @IsString()
  symbol: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateCurrencyDto {
  @IsOptional()
  @IsString()
  currencyName?: string;

  @IsOptional()
  @IsString()
  currencyCode?: string;

  @IsOptional()
  @IsString()
  symbol?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
