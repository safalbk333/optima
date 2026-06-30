import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrencyGatewayService } from './currency.service';
import { CreateCurrencyDto, UpdateCurrencyDto } from './dto/currency.dto';

@ApiTags('Currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyGatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new currency' })
  @ApiResponse({ status: 200, description: 'Currency created successfully' })
  @ApiBody({ type: CreateCurrencyDto })
  create(@Body() data: CreateCurrencyDto) {
    return this.currencyService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all currencies' })
  @ApiResponse({ status: 200, description: 'Currencies fetched successfully' })
  findAll() {
    return this.currencyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get currency by id' })
  @ApiResponse({ status: 200, description: 'Currency fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.currencyService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a currency' })
  @ApiResponse({ status: 200, description: 'Currency updated successfully' })
  @ApiBody({ type: UpdateCurrencyDto })
  update(@Param('id') id: string, @Body() data: UpdateCurrencyDto) {
    return this.currencyService.update(id, data);
  }
}
