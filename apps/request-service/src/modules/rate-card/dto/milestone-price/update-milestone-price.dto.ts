import { PartialType } from '@nestjs/swagger';
import { CreateMilestonePriceDto } from './create-milestone-price.dto';

export class UpdateMilestonePriceDto extends PartialType(CreateMilestonePriceDto) {}