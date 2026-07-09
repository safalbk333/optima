import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CountryService } from './country.service';
import { CreateCountryDto, UpdateCountryDto } from './dto/country.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CountryProperties } from '../../common/properties/country.properties';

@Controller()
export class CountryController {
  private readonly logger = new AppLogger(CountryController.name);

  constructor(private readonly countryService: CountryService) {
    this.logger.log(CountryProperties.controller.start);
  }

  @MessagePattern('country.create')
  create(@Payload() payload: { schemaId: string; data: CreateCountryDto }) {
    this.logger.log(CountryProperties.controller.create);
    return this.countryService.create(payload.schemaId, payload.data);
  }

  @MessagePattern('country.findAll')
  findAll(@Payload() payload: { schemaId: string; limit?: number; page?: number; search?: string }) {
    this.logger.log(CountryProperties.controller.findAll);
    return this.countryService.findAll(payload.schemaId, payload);
  }

  @MessagePattern('country.findOne')
  findOne(@Payload() payload: { schemaId: string; id: string }) {
    this.logger.log(`${CountryProperties.controller.findOne}: ${payload.id}`);
    return this.countryService.findOne(payload.schemaId, payload.id);
  }

  @MessagePattern('country.update')
  update(@Payload() payload: { schemaId: string; id: string; data: UpdateCountryDto }) {
    this.logger.log(`${CountryProperties.controller.update}: ${payload.id}`);
    return this.countryService.update(payload.schemaId, payload.id, payload.data);
  }
}
