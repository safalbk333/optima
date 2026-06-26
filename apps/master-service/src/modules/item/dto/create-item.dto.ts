import {
    IsString,
    IsOptional,
    IsBoolean,
} from 'class-validator';

export class CreateItemDto {
    @IsString()
    itemName: string;

    @IsString()
    itemCode: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    categoryId: string;

    @IsOptional()
    @IsString()
    unit?: string;

    @IsString()
    sacCode: string;

    @IsOptional()
    @IsString()
    documents?: string;
}

export class UpdateItemDto {
    @IsOptional()
    @IsString()
    itemName: string;

    @IsOptional()
    @IsString()
    itemCode: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    categoryId: string;

    @IsOptional()
    @IsString()
    unit?: string;

    @IsOptional()
    @IsString()
    sacCode: string;

    @IsOptional()
    @IsString()
    documents?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
