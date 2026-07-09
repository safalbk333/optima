import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountryGatewayService } from './country.service';
import { CreateCountryDto, UpdateCountryDto } from './dto/country.dto';
import { SchemaId } from '../../guards/decorators/schema-id.decorator';

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryGatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new country' })
  @ApiResponse({ status: 200, description: 'Country created successfully' })
  @ApiBody({ type: CreateCountryDto })
  create(
    @SchemaId() schemaId: string,
    @Body() data: CreateCountryDto,
  ) {
    return this.countryService.create(schemaId, data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({ status: 200, description: 'Countries fetched successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search by name or code' })
  findAll(
    @SchemaId() schemaId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.countryService.findAll(schemaId, {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get country by id (includes cities)' })
  @ApiResponse({ status: 200, description: 'Country fetched successfully' })
  findOne(
    @SchemaId() schemaId: string,
    @Param('id') id: string,
  ) {
    return this.countryService.findOne(schemaId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a country' })
  @ApiResponse({ status: 200, description: 'Country updated successfully' })
  @ApiBody({ type: UpdateCountryDto })
  update(
    @SchemaId() schemaId: string,
    @Param('id') id: string,
    @Body() data: UpdateCountryDto,
  ) {
    return this.countryService.update(schemaId, id, data);
  }
}
