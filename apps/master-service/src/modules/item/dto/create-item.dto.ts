import {
    IsString,
    IsOptional,
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

    @IsOptional()
    @IsString()
    documents?: string;
}
