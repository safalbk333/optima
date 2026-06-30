import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  countryName: string;

  @IsString()
  countryCode: string;
}

export class UpdateCountryDto {
  @IsOptional()
  @IsString()
  countryName?: string;

  @IsOptional()
  @IsString()
  countryCode?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
