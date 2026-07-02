import { PartialType } from '@nestjs/swagger';
import { CreateFixedPriceDto } from './create-fixed-price.dto';

export class UpdateFixedPriceDto extends PartialType(CreateFixedPriceDto) {}