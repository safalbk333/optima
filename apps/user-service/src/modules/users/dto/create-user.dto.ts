import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @Matches(/^OPT\d+$/)
  optimaId: string;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsString()
  lastName: string;

  @IsArray()
  @IsString({ each: true })
  roles: string[];
}
