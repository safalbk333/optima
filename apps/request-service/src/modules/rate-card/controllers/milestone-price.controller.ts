import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MilestonePriceService } from '../services/milestone-price.service';
import { CreateMilestonePriceDto } from '../dto/milestone-price/create-milestone-price.dto';
import { UpdateMilestonePriceDto } from '../dto/milestone-price/update-milestone-price.dto';
import { AppLogger } from '../../../common/logger/app.logger';

@Controller()
export class MilestonePriceController {
  private readonly logger = new AppLogger(MilestonePriceController.name);

  constructor(private readonly milestonePriceService: MilestonePriceService) {
    this.logger.log('MilestonePriceController initialized');
  }

  @MessagePattern('milestone-price.create')
  create(
    @Payload() data: { rateCardId: string; itemId: string; dto: CreateMilestonePriceDto },
  ) {
    this.logger.log(`milestone-price.create: item=${data.itemId}`);
    return this.milestonePriceService.create(data.rateCardId, data.itemId, data.dto);
  }

  @MessagePattern('milestone-price.update')
  update(
    @Payload()
    data: {
      rateCardId: string;
      itemId: string;
      milestoneId: string;
      dto: UpdateMilestonePriceDto;
    },
  ) {
    this.logger.log(`milestone-price.update: milestone=${data.milestoneId}`);
    return this.milestonePriceService.update(
      data.rateCardId,
      data.itemId,
      data.milestoneId,
      data.dto,
    );
  }

  @MessagePattern('milestone-price.delete')
  delete(@Payload() data: { rateCardId: string; itemId: string; milestoneId: string }) {
    this.logger.log(`milestone-price.delete: milestone=${data.milestoneId}`);
    return this.milestonePriceService.delete(data.rateCardId, data.itemId, data.milestoneId);
  }
}