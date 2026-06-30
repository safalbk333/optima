import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCityDto {
  @IsString()
  cityName: string;

  @IsString()
  countryId: string;
}

export class UpdateCityDto {
  @IsOptional()
  @IsString()
  cityName?: string;

  @IsOptional()
  @IsString()
  countryId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
