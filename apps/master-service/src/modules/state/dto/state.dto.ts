import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateStateDto {
  @IsString()
  stateName: string;

  @IsString()
  countryId: string;
}

export class UpdateStateDto {
  @IsOptional()
  @IsString()
  stateName?: string;

  @IsOptional()
  @IsString()
  countryId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
