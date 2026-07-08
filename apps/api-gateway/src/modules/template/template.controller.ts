import { Body, Controller, Get, Header, Param, Post, Res, StreamableFile } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TemplateGatewayService } from './template.service';

@ApiTags('Template-Service')
@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateGatewayService) { }

  @Post('get-by-code')
  @ApiOperation({ summary: 'Get template HTML content by template code' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        templateCode: { type: 'string', example: 'EOI_TEMPLATE' },
      },
      required: ['templateCode'],
    },
  })
  @ApiResponse({ status: 200, description: 'Template fetched successfully' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  getByCode(@Body('templateCode') templateCode: string) {
    return this.templateService.getByCode(templateCode);
  }

  @Get('download/:type')
  @ApiOperation({
    summary: 'Download Item/Vendor Excel Template',
  })
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @ApiParam({
    name: 'type',
    required: true,
    type: String,
    enum: ['vendor', 'item'],
  })
  async downloadTemplate(
    @Param('type') type: string,
  ) {
    const response = await this.templateService.downloadTemplate(type);
    const buffer = Buffer.from(response.buffer, 'base64');

    return new StreamableFile(buffer, {
      disposition: `attachment; filename=${type}_template.xlsx`,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  }
}
