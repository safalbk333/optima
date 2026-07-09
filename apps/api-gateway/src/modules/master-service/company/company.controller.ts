import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyGatewayService } from './company.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';
import { SchemaId } from '../../guards/decorators/schema-id.decorator';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyGatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: 200, description: 'Company created successfully' })
  @ApiBody({ type: CreateCompanyDto })
  create(
    @SchemaId() schemaId: string,
    @Body() data: CreateCompanyDto,
  ) {
    return this.companyService.create(schemaId, data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Companies fetched successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search by name, code or email' })
  findAll(
    @SchemaId() schemaId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.companyService.findAll(schemaId, {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company by id' })
  @ApiResponse({ status: 200, description: 'Company fetched successfully' })
  findOne(
    @SchemaId() schemaId: string,
    @Param('id') id: string,
  ) {
    return this.companyService.findOne(schemaId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a company' })
  @ApiResponse({ status: 200, description: 'Company updated successfully' })
  @ApiBody({ type: UpdateCompanyDto })
  update(
    @SchemaId() schemaId: string,
    @Param('id') id: string,
    @Body() data: UpdateCompanyDto,
  ) {
    return this.companyService.update(schemaId, id, data);
  }
}
