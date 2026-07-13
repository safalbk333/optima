import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CityService } from './city.service';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CityProperties } from '../../common/properties/city.properties';

@Controller()
export class CityController {
  private readonly logger = new AppLogger(CityController.name);

  constructor(private readonly cityService: CityService) {
    this.logger.log(CityProperties.controller.start);
  }

  @MessagePattern('city.create')
  create(@Payload() payload: { schemaId: string; data: CreateCityDto }) {
    this.logger.log(CityProperties.controller.create);
    return this.cityService.create(payload.schemaId, payload.data);
  }

  @MessagePattern('city.findAll')
  findAll(@Payload() payload: { schemaId: string; limit?: number; page?: number; search?: string; countryId?: string }) {
    this.logger.log(CityProperties.controller.findAll);
    return this.cityService.findAll(payload.schemaId, payload);
  }

  @MessagePattern('city.findOne')
  findOne(@Payload() payload: { schemaId: string; id: string }) {
    this.logger.log(`${CityProperties.controller.findOne}: ${payload.id}`);
    return this.cityService.findOne(payload.schemaId, payload.id);
  }

  @MessagePattern('city.update')
  update(@Payload() payload: { schemaId: string; id: string; data: UpdateCityDto }) {
    this.logger.log(`${CityProperties.controller.update}: ${payload.id}`);
    return this.cityService.update(payload.schemaId, payload.id, payload.data);
  }
}
