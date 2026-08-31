import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppLogger } from '../../common/logger/app.logger';
import { CityProperties } from '../../common/properties/city.properties';
import { CreateStateDto, UpdateStateDto } from './dto/state.dto';
import { StateProperties } from '../../common/properties/state.properties';
import { StateService } from './state.service';

@Controller()
export class StateController {
  private readonly logger = new AppLogger(StateController.name);

  constructor(private readonly stateService: StateService) {
    this.logger.log(CityProperties.controller.start);
  }

  @MessagePattern('state.create')
  create(@Payload() payload: { schemaId: string; data: CreateStateDto }) {
    this.logger.log(StateProperties.controller.create);
    return this.stateService.create(payload.schemaId, payload.data);
  }

  @MessagePattern('state.findAll')
  findAll(@Payload() payload: { schemaId: string; limit?: number; page?: number; search?: string; countryId?: string }) {
    this.logger.log(StateProperties.controller.findAll);
    return this.stateService.findAll(payload.schemaId, payload);
  }

  @MessagePattern('state.findOne')
  findOne(@Payload() payload: { schemaId: string; id: string }) {
    this.logger.log(`${StateProperties.controller.findOne}: ${payload.id}`);
    return this.stateService.findOne(payload.schemaId, payload.id);
  }

  @MessagePattern('state.update')
  update(@Payload() payload: { schemaId: string; id: string; data: UpdateStateDto }) {
    this.logger.log(`${StateProperties.controller.update}: ${payload.id}`);
    return this.stateService.update(payload.schemaId, payload.id, payload.data);
  }
}
