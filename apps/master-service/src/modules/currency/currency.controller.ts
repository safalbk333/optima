import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto, UpdateCurrencyDto } from './dto/currency.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CurrencyProperties } from '../../common/properties/currency.properties';

/**
 * CurrencyController
 *
 * Every TCP message from the gateway includes `schemaId` in the payload.
 * The controller extracts it and passes it to the service.
 *
 * Gateway sends:
 *   this.client.send('currency.findAll', { schemaId: 'tenant-uuid' });
 *   this.client.send('currency.create', { schemaId: 'tenant-uuid', data: { ... } });
 */
@Controller()
export class CurrencyController {
  private readonly logger = new AppLogger(CurrencyController.name);

  constructor(private readonly currencyService: CurrencyService) {
    this.logger.log(CurrencyProperties.controller.start);
  }

  @MessagePattern('currency.create')
  create(@Payload() payload: { schemaId: string; data: CreateCurrencyDto }) {
    this.logger.log(CurrencyProperties.controller.create);
    return this.currencyService.create(payload.schemaId, payload.data);
  }

  @MessagePattern('currency.findAll')
  findAll(@Payload() payload: { schemaId: string }) {
    this.logger.log(CurrencyProperties.controller.findAll);
    return this.currencyService.findAll(payload.schemaId);
  }

  @MessagePattern('currency.findOne')
  findOne(@Payload() payload: { schemaId: string; id: string }) {
    this.logger.log(`${CurrencyProperties.controller.findOne}: ${payload.id}`);
    return this.currencyService.findOne(payload.schemaId, payload.id);
  }

  @MessagePattern('currency.update')
  update(@Payload() payload: { schemaId: string; id: string; data: UpdateCurrencyDto }) {
    this.logger.log(`${CurrencyProperties.controller.update}: ${payload.id}`);
    return this.currencyService.update(payload.schemaId, payload.id, payload.data);
  }
}
