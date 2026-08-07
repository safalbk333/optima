import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CacheService } from 'libs/database/cache.service';
import { AppLogger } from '../../common/logger/app.logger';
import { TemplateProperties } from '../../common/properties/template.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';
import * as XLSX from 'xlsx';

const CACHE_KEYS = {
  byCode: (strSchemaId: string, strCode: string) => `${strSchemaId}:template:${strCode}`,
};

@Injectable()
export class TemplateService {
  private readonly logger = new AppLogger(TemplateService.name);
  private objSchemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
    // private readonly cache: CacheService,
  ) { }

  private async getSchemaClient() {
    if (!this.objSchemaClient) {
      this.objSchemaClient = await this.prisma.getClient('public');
    }
    return this.objSchemaClient;
  }

  async getByCode(strSchemaId: string, strTemplateCode: string) {
    try {
      this.logger.log(`${TemplateProperties.service.getByCode.start}: ${strTemplateCode}`);

      const objPrisma = await this.getSchemaClient();

      const objTemplate = await (objPrisma as any).tbl_templates.findFirst({
        where: {
          template_code: strTemplateCode,
          is_active: true,
          document_status: {
            not: 'D',
          },
        },
        select: {
          pk_template_id: true,
          template_code: true,
          template_name: true,
          document_type: true,
          html_content: true,
        },
      });

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

  async downloadTemplate(type: string): Promise<any> {
    try {
      let headers: string[];

      switch (type) {
        case 'vendor':
          headers = [
            'Company Legal Name',
            'Trading Name',
            'Contact Person',
            'Email',
            'Phone',
            'Company Type',
            'Year Of Establishment',
            'Office Address',
            'GST Number',
            'PAN Number',
            'MSME Status',
            'Bank',
            'Nature of Business',
            'Categories of Supply',
            'Country Id',
            'City Id',
            'Status',
            'Notes',
          ];
          break;

        case 'item':
          headers = [
            'Item Name',
            'Item Code',
            'Category Id',
            'Unit',
            'RC Flag',
            'HSN Code',
            'Description',
            'Documents',
          ];
          break;

        default:
          throw new BadRequestException(
            'Invalid template type',
          );
      }

      const worksheet = XLSX.utils.aoa_to_sheet([
        headers,
      ]);

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        'Template',
      );
      const buffer = XLSX.write(workbook, {
        type: 'buffer',
        bookType: 'xlsx',
      });

      return {
        buffer: buffer.toString('base64'),
      };
    } catch (error) {
      this.logger.error(
        error.stack,
      );
      throw error;
    }
  }
}
