import {
    IsString,
    IsBoolean,
    IsDateString,
    IsOptional,
} from 'class-validator';

export class CreateRoleDto {
    @IsString()
    role_name: string;

    @IsString()
    role_code: string;

    @IsString()
    description: string;

    @IsBoolean()
    @IsOptional()
    is_active: boolean;
}