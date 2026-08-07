import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuotationGatewayService } from './quotation.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';

@ApiTags('Quotation-[vendor Service]')
@Controller('quotation')
export class QuotationController {
  constructor(
    private readonly quotationService: QuotationGatewayService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a new quotation' })
  @ApiResponse({ status: 200, description: 'Quotation created successfully' })
  create(@Body() data: CreateQuotationDto) {
    return this.quotationService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quotations' })
  @ApiResponse({ status: 200, description: 'Quotation list fetched successfully' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of quotations per page' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'status', required: false, type: String, description: 'Filter by quotation status' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search for quotations' })
  findAll(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const payload = {
      limit: Number(limit),
      page: Number(page),
      search: search,
      status: status,
    };
    return this.quotationService.findAll(payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quotation by id' })
  @ApiResponse({ status: 200, description: 'Quotation fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.quotationService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update quotation' })
  @ApiResponse({ status: 200, description: 'Quotation updated successfully' })
  update(
    @Param('id') id: string,
    @Body() data: UpdateQuotationDto,
  ) {
    return this.quotationService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete quotation' })
  @ApiResponse({ status: 200, description: 'Quotation deleted successfully' })
  delete(@Param('id') id: string) {
    return this.quotationService.delete(id);
  }
}
