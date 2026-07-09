import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CityGatewayService } from './city.service';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';
import { SchemaId } from '../../guards/decorators/schema-id.decorator';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityGatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new city' })
  @ApiResponse({ status: 200, description: 'City created successfully' })
  @ApiBody({ type: CreateCityDto })
  create(
    @SchemaId() schemaId: string,
    @Body() data: CreateCityDto,
  ) {
    return this.cityService.create(schemaId, data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cities' })
  @ApiResponse({ status: 200, description: 'Cities fetched successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search by city name' })
  @ApiQuery({ name: 'countryId', required: false, type: String, description: 'Filter by country ID' })
  findAll(
    @SchemaId() schemaId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('countryId') countryId?: string,
  ) {
    return this.cityService.findAll(schemaId, {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search,
      countryId,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get city by id' })
  @ApiResponse({ status: 200, description: 'City fetched successfully' })
  findOne(
    @SchemaId() schemaId: string,
    @Param('id') id: string,
  ) {
    return this.cityService.findOne(schemaId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a city' })
  @ApiResponse({ status: 200, description: 'City updated successfully' })
  @ApiBody({ type: UpdateCityDto })
  update(
    @SchemaId() schemaId: string,
    @Param('id') id: string,
    @Body() data: UpdateCityDto,
  ) {
    return this.cityService.update(schemaId, id, data);
  }
}
