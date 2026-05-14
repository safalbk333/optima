import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuotationGatewayService } from './quotation.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';

@ApiTags('Quotation-Service')
@Controller('quotation')
export class QuotationController {
  constructor(
    private readonly quotationService: QuotationGatewayService,
  ) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new quotation',
  })
  @ApiResponse({
    status: 200,
    description:
      'Quotation created successfully',
  })
  create(@Body() data: CreateQuotationDto) {
    return this.quotationService.create(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all quotations',
  })
  @ApiResponse({
    status: 200,
    description:
      'Quotation list fetched successfully',
  })
  findAll() {
    return this.quotationService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get quotation by id',
  })
  @ApiResponse({
    status: 200,
    description:
      'Quotation fetched successfully',
  })
  findOne(@Param('id') id: string) {
    return this.quotationService.findOne(id);
  }
}