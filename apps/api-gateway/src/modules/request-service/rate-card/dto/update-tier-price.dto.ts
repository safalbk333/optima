import { PartialType } from '@nestjs/swagger';
import { CreateTierPriceDto } from './create-tier-price.dto';

export class UpdateTierPriceDto extends PartialType(CreateTierPriceDto) {}
