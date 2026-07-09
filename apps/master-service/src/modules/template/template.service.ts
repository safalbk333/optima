import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CacheService } from 'libs/database/cache.service';
import { AppLogger } from '../../common/logger/app.logger';
import { TemplateProperties } from '../../common/properties/template.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

const CACHE_KEYS = {
  byCode: (strSchemaId: string, strCode: string) => `${strSchemaId}:template:${strCode}`,
};

@Injectable()
export class TemplateService {
  private readonly logger = new AppLogger(TemplateService.name);
  private objSchemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  private async getSchemaClient() {
    if (!this.objSchemaClient) {
      this.objSchemaClient = await this.prisma.getClient('public');
    }
    return this.objSchemaClient;
  }

  async getByCode(strSchemaId: string, strTemplateCode: string) {
    try {
      this.logger.log(`${TemplateProperties.service.getByCode.start}: ${strTemplateCode}`);

      const objTemplate = await this.cache.getOrSet(
        CACHE_KEYS.byCode(strSchemaId, strTemplateCode),
        async () => {
          this.logger.log(`[DB Fallback] Fetching template ${strTemplateCode} from database`);
          const objPrisma = await this.getSchemaClient();
          return (objPrisma as any).tbl_templates.findFirst({
            where: { template_code: strTemplateCode, is_active: true, document_status: { not: 'D' } },
            select: {
              pk_template_id: true,
              template_code: true,
              template_name: true,
              document_type: true,
              html_content: true,
            },
          });
        },
      );

      if (!objTemplate) {
        throw new NotFoundException(TemplateProperties.service.getByCode.notFound);
      }

      this.logger.log(`${TemplateProperties.service.getByCode.success}: ${strTemplateCode}`);
      return ResponseHelper.success(objTemplate, 'Template fetched successfully');
    } catch (error) {
      this.logger.error(`${TemplateProperties.service.getByCode.error}: ${strTemplateCode}`, error.stack);
      throw error;
    }
  }
}
