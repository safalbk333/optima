import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { TEMPLATE_PATTERN } from './template.pattern';

@Injectable()
export class TemplateGatewayService {
  private readonly logger = new Logger(TemplateGatewayService.name);

  constructor(
    @Inject('MASTER_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async getByCode(templateCode: string) {
    try {
      return await firstValueFrom(
        this.client.send(TEMPLATE_PATTERN.GET_BY_CODE, templateCode),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
