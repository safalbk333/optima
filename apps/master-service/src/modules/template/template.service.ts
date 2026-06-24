import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { AppLogger } from '../../common/logger/app.logger';
import { TemplateProperties } from '../../common/properties/template.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

@Injectable()
export class TemplateService {
  private readonly logger = new AppLogger(TemplateService.name);
  private schemaClient: any;

  constructor(private readonly prisma: PrismaService) { }

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient =
        await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  async getByCode(strTemplateCode: string) {
    try {
      this.logger.log(`${TemplateProperties.service.getByCode.start}: ${strTemplateCode}`);
      const prisma =
        await this.getSchemaClient();

      const template = await (prisma as any).tbl_templates.findFirst({
        where: {
          template_code: strTemplateCode,
          is_active: true,
          document_status: { not: 'D' },
        },
        select: {
          pk_template_id: true,
          template_code: true,
          template_name: true,
          document_type: true,
          html_content: true,
        },
      });

      if (!template) {
        throw new NotFoundException(TemplateProperties.service.getByCode.notFound);
      }

      this.logger.log(`${TemplateProperties.service.getByCode.success}: ${strTemplateCode}`);
      return ResponseHelper.success(template, 'Template fetched successfully');
    } catch (error) {
      this.logger.error(`${TemplateProperties.service.getByCode.error}: ${strTemplateCode}`, error.stack);
      throw error;
    }
  }
}
