import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { AppLogger } from '../../common/logger/app.logger';
import { TemplateProperties } from '../../common/properties/template.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

@Injectable()
export class TemplateService {
  private readonly logger = new AppLogger(TemplateService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getByCode(strTemplateCode: string) {
    try {
      this.logger.log(`${TemplateProperties.service.getByCode.start}: ${strTemplateCode}`);

      const template = await (this.prisma as any).tbl_templates.findFirst({
        where: {
          chr_template_code: strTemplateCode,
          bln_is_active: true,
          chr_document_status: { not: 'D' },
        },
        select: {
          pk_chr_template_id: true,
          chr_template_code: true,
          chr_template_name: true,
          chr_document_type: true,
          txt_html_content: true,
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
