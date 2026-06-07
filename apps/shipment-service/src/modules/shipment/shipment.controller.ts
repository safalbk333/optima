import { Controller, Param } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { ShipmentService } from './shipment.service';
import { AppLogger } from '../../common/logger/app.logger';
import { ShipmentProperties } from '../../common/properties/shipment.properties';
import { CreateShipmentDto } from './dto/create-shipment.dto';

@Controller()
export class ShipmentController {
  private readonly logger = new AppLogger(ShipmentController.name);

  constructor(
    private readonly shipmentService: ShipmentService,
  ) {
    this.logger.log(ShipmentProperties.controller.start);
  }

  @MessagePattern('shipment.create')
    create(@Payload() createShipmentDto: CreateShipmentDto) {
      this.logger.log(ShipmentProperties.controller.create);
      return this.shipmentService.create(createShipmentDto);
    }

  @MessagePattern('shipment.findAll')
  findAll(
     @Payload() payload: {
      limit?: number;
      page?: number;
      search?:string;
      status?: string;
      carrier?: string;
    },
  ) {
    this.logger.log(ShipmentProperties.controller.findAll);
    return this.shipmentService.findAll(payload);
  }

  @MessagePattern('shipment.findOne')
  findOne(@Payload() data: { id: string }) {
    this.logger.log(`${ShipmentProperties.controller.findOne}: ${data.id}`);
    return this.shipmentService.findOne(data.id);
  }
}