import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto, UpdateCurrencyDto } from './dto/currency.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CurrencyProperties } from '../../common/properties/currency.properties';

@Controller()
export class CurrencyController {
  private readonly logger = new AppLogger(CurrencyController.name);

  constructor(private readonly currencyService: CurrencyService) {
    this.logger.log(CurrencyProperties.controller.start);
  }

  @MessagePattern('currency.create')
  create(@Payload() dto: CreateCurrencyDto) {
    this.logger.log(CurrencyProperties.controller.create);
    return this.currencyService.create(dto);
  }

  @MessagePattern('currency.findAll')
  findAll() {
    this.logger.log(CurrencyProperties.controller.findAll);
    return this.currencyService.findAll();
  }

  @MessagePattern('currency.findOne')
  findOne(@Payload() data: { id: string }) {
    this.logger.log(`${CurrencyProperties.controller.findOne}: ${data.id}`);
    return this.currencyService.findOne(data.id);
  }

  @MessagePattern('currency.update')
  update(@Payload() payload: { id: string; data: UpdateCurrencyDto }) {
    this.logger.log(`${CurrencyProperties.controller.update}: ${payload.id}`);
    return this.currencyService.update(payload.id, payload.data);
  }
}
