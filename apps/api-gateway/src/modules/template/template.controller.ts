import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TemplateGatewayService } from './template.service';

@ApiTags('Template-Service')
@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateGatewayService) {}

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
}
