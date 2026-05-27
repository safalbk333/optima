import {
    IsString,
    IsOptional,
} from 'class-validator';

export class CreateItemDto {
    @IsString()
    strItemName: string;

    @IsString()
    strItemCode: string;

    @IsOptional()
    @IsString()
    strDescription?: string;

    @IsString()
    strCategoryId: string;

    @IsOptional()
    @IsString()
    strUnit?: string;

    @IsOptional()
    @IsString()
    strDocuments?: string;
}
