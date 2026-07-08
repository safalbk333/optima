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
  getByCode(@Payload() templateCode: string) {
    this.logger.log(`${TemplateProperties.controller.getByCode}: ${templateCode}`);
    return this.templateService.getByCode(templateCode);
  }

  @MessagePattern('template.downloadTemplate')
  async downloadTemplate(
    @Payload() payload: any,
  ) {
    return this.templateService.downloadTemplate(
      payload.type,
    );
  }
}
