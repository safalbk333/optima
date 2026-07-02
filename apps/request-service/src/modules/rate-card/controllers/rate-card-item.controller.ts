import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RateCardItemService } from '../services/rate-card-item.service';
import { CreateRateCardItemDto } from '../dto/rate-card-item/create-rate-card-item.dto';
import { UpdateRateCardItemDto } from '../dto/rate-card-item/update-rate-card-item.dto';
import { AppLogger } from '../../../common/logger/app.logger';

@Controller()
export class RateCardItemController {
  private readonly logger = new AppLogger(RateCardItemController.name);

  constructor(private readonly rateCardItemService: RateCardItemService) {
    this.logger.log('RateCardItemController initialized');
  }

  @MessagePattern('rate-card-item.add')
  addItem(
    @Payload() data: { rateCardId: string; dto: CreateRateCardItemDto; userId: string },
  ) {
    this.logger.log(`rate-card-item.add: rateCard=${data.rateCardId} item=${data.dto.fk_item_id}`);
    return this.rateCardItemService.addItem(data.rateCardId, data.dto, data.userId);
  }

  @MessagePattern('rate-card-item.list')
  listItems(@Payload() data: { rateCardId: string }) {
    this.logger.log(`rate-card-item.list: rateCard=${data.rateCardId}`);
    return this.rateCardItemService.listItems(data.rateCardId);
  }

  @MessagePattern('rate-card-item.update')
  updateItem(
    @Payload() data: { rateCardId: string; itemId: string; dto: UpdateRateCardItemDto; userId: string },
  ) {
    this.logger.log(`rate-card-item.update: ${data.itemId}`);
    return this.rateCardItemService.updateItem(data.rateCardId, data.itemId, data.dto, data.userId);
  }

  @MessagePattern('rate-card-item.delete')
  deleteItem(@Payload() data: { rateCardId: string; itemId: string }) {
    this.logger.log(`rate-card-item.delete: ${data.itemId}`);
    return this.rateCardItemService.deleteItem(data.rateCardId, data.itemId);
  }
}