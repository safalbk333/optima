import { Controller } from '@nestjs/common';

import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { EoiService } from './eoi.service';

import { CreateEoiDto } from './dto/create-eoi.dto';
import { UpdateEoiDto } from './dto/update-eoi.dto';
import { UpdateEoiStatusDto } from './dto/update-eoi-status.dto';

import { AppLogger } from '../../common/logger/app.logger';
import { EoiProperties } from '../../common/properties/eoi.properties';

@Controller("eoi")
export class EoiController {
  private readonly logger = new AppLogger(
    EoiController.name,
  );

  constructor(
    private readonly eoiService: EoiService,
  ) {
    this.logger.log(
      EoiProperties.controller.start,
    );
  }

  // =========================================================
  // FIND ALL
  // =========================================================

  @MessagePattern('eoi.findAll')
  findAll() {
    this.logger.log(
      EoiProperties.controller.findAll,
    );

    return this.eoiService.findAll();
  }

  // =========================================================
// FIND BY VENDOR ID
// =========================================================

@MessagePattern('eoi.findByVendorId')
findByVendorId(
  @Payload() vendorId: string,
) {
  this.logger.log(
    `${EoiProperties.controller.findByVendorId}: ${vendorId}`,
  );

  return this.eoiService.findByVendorId(
    vendorId,
  );
}
  // =========================================================
  // FIND ONE
  // =========================================================


  @MessagePattern('eoi.findOne')
  findOne(
    @Payload() id: string,
  ) {
    this.logger.log(
      `${EoiProperties.controller.findOne}: ${id}`,
    );

    return this.eoiService.findOne(id);
  }

  // =========================================================
  // CREATE
  // =========================================================

  @MessagePattern('eoi.create')
  create(
    @Payload()
    data: CreateEoiDto,
  ) {
    this.logger.log(
      EoiProperties.controller.create,
    );

    return this.eoiService.create(data);
  }

  // =========================================================
  // UPDATE
  // =========================================================

  @MessagePattern('eoi.update')
  update(
    @Payload()
    payload: {
      id: string;
      data: UpdateEoiDto;
    },
  ) {
    this.logger.log(
      `${EoiProperties.controller.update}: ${payload.id}`,
    );

    return this.eoiService.update(
      payload.id,
      payload.data,
    );
  }

  // =========================================================
  // CHANGE STATUS
  // =========================================================

  @MessagePattern('eoi.changeStatus')
  changeStatus(
    @Payload()
    payload: {
      id: string;
      data: UpdateEoiStatusDto;
    },
  ) {
    this.logger.log(
      `${EoiProperties.controller.changeStatus}: ${payload.id}`,
    );

    return this.eoiService.changeStatus(
      payload.id,
      payload.data,
    );
  }

  // =========================================================
  // DELETE
  // =========================================================

  @MessagePattern('eoi.delete')
  delete(
    @Payload() id: string,
  ) {
    this.logger.log(
      `${EoiProperties.controller.delete}: ${id}`,
    );

    return this.eoiService.delete(id);
  }
}