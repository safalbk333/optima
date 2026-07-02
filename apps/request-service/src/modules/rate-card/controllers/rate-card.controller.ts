import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RateCardService } from '../services/rate-card.service';
import { CreateRateCardDto } from '../dto/rate-card/create-rate-card.dto';
import { UpdateRateCardDto } from '../dto/rate-card/update-rate-card.dto';
import { RateCardQueryDto } from '../dto/rate-card/rate-card-query.dto';
import { CloneRateCardDto } from '../dto/rate-card/clone-rate-card.dto';
import { AppLogger } from '../../../common/logger/app.logger';

@Controller()
export class RateCardController {
  private readonly logger = new AppLogger(RateCardController.name);

  constructor(private readonly rateCardService: RateCardService) {
    this.logger.log('RateCardController initialized');
  }

  @MessagePattern('rate-card.create')
  create(@Payload() data: { dto: CreateRateCardDto; userId: string }) {
    this.logger.log(`rate-card.create: ${data.dto.rate_card_code}`);
    return this.rateCardService.create(data.dto, data.userId);
  }

  @MessagePattern('rate-card.findAll')
  findAll(@Payload() query: RateCardQueryDto) {
    this.logger.log('rate-card.findAll');
    return this.rateCardService.findAll(query);
  }

  @MessagePattern('rate-card.findOne')
  findOne(@Payload() data: { id: string }) {
    this.logger.log(`rate-card.findOne: ${data.id}`);
    return this.rateCardService.findOne(data.id);
  }

  @MessagePattern('rate-card.update')
  update(@Payload() data: { id: string; dto: UpdateRateCardDto; userId: string }) {
    this.logger.log(`rate-card.update: ${data.id}`);
    return this.rateCardService.update(data.id, data.dto, data.userId);
  }

  @MessagePattern('rate-card.remove')
  remove(@Payload() data: { id: string; userId: string }) {
    this.logger.log(`rate-card.remove: ${data.id}`);
    return this.rateCardService.remove(data.id, data.userId);
  }

  @MessagePattern('rate-card.activate')
  activate(@Payload() data: { id: string; userId: string }) {
    this.logger.log(`rate-card.activate: ${data.id}`);
    return this.rateCardService.activate(data.id, data.userId);
  }

  @MessagePattern('rate-card.deactivate')
  deactivate(@Payload() data: { id: string; userId: string }) {
    this.logger.log(`rate-card.deactivate: ${data.id}`);
    return this.rateCardService.deactivate(data.id, data.userId);
  }

  @MessagePattern('rate-card.clone')
  clone(@Payload() data: { id: string; dto: CloneRateCardDto; userId: string }) {
    this.logger.log(`rate-card.clone: ${data.id}`);
    return this.rateCardService.clone(data.id, data.dto, data.userId);
  }

  @MessagePattern('rate-card.getActive')
  getActive() {
    this.logger.log('rate-card.getActive');
    return this.rateCardService.getActive();
  }

  @MessagePattern('rate-card.getExpired')
  getExpired() {
    this.logger.log('rate-card.getExpired');
    return this.rateCardService.getExpired();
  }

  @MessagePattern('rate-card.getExpiring')
  getExpiring(@Payload() data: { days: number }) {
    this.logger.log(`rate-card.getExpiring: ${data.days} days`);
    return this.rateCardService.getExpiring(data.days);
  }
}