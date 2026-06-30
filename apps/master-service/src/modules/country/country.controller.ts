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
  create(@Payload() dto: CreateCountryDto) {
    this.logger.log(CountryProperties.controller.create);
    return this.countryService.create(dto);
  }

  @MessagePattern('country.findAll')
  findAll(@Payload() payload: { limit?: number; page?: number; search?: string }) {
    this.logger.log(CountryProperties.controller.findAll);
    return this.countryService.findAll(payload);
  }

  @MessagePattern('country.findOne')
  findOne(@Payload() data: { id: string }) {
    this.logger.log(`${CountryProperties.controller.findOne}: ${data.id}`);
    return this.countryService.findOne(data.id);
  }

  @MessagePattern('country.update')
  update(@Payload() payload: { id: string; data: UpdateCountryDto }) {
    this.logger.log(`${CountryProperties.controller.update}: ${payload.id}`);
    return this.countryService.update(payload.id, payload.data);
  }
}
