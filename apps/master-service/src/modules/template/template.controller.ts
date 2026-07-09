import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TemplateService } from './template.service';
import { AppLogger } from '../../common/logger/app.logger';
import { TemplateProperties } from '../../common/properties/template.properties';

@Controller()
export class TemplateController {
  private readonly logger = new AppLogger(TemplateController.name);

  constructor(private readonly templateService: TemplateService) {
    this.logger.log(TemplateProperties.controller.start);
  }

  @MessagePattern('template.getByCode')
  getByCode(@Payload() payload: { schemaId: string; templateCode: string }) {
    this.logger.log(`${TemplateProperties.controller.getByCode}: ${payload.templateCode}`);
    return this.templateService.getByCode(payload.schemaId, payload.templateCode);
  }
}
