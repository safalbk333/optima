import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrencyGatewayService } from './currency.service';
import { CreateCurrencyDto, UpdateCurrencyDto } from './dto/currency.dto';
import { SchemaId } from '../../guards/decorators/schema-id.decorator';

@ApiTags('Currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyGatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new currency' })
  @ApiResponse({ status: 200, description: 'Currency created successfully' })
  @ApiBody({ type: CreateCurrencyDto })
  create(
    @SchemaId() schemaId: string,
    @Body() data: CreateCurrencyDto,
  ) {
    return this.currencyService.create(schemaId, data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all currencies' })
  @ApiResponse({ status: 200, description: 'Currencies fetched successfully' })
  findAll(@SchemaId() schemaId: string) {
    return this.currencyService.findAll(schemaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get currency by id' })
  @ApiResponse({ status: 200, description: 'Currency fetched successfully' })
  findOne(
    @SchemaId() schemaId: string,
    @Param('id') id: string,
  ) {
    return this.currencyService.findOne(schemaId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a currency' })
  @ApiResponse({ status: 200, description: 'Currency updated successfully' })
  @ApiBody({ type: UpdateCurrencyDto })
  update(
    @SchemaId() schemaId: string,
    @Param('id') id: string,
    @Body() data: UpdateCurrencyDto,
  ) {
    return this.currencyService.update(schemaId, id, data);
  }
}
