import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CityGatewayService } from './city.service';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityGatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new city' })
  @ApiResponse({ status: 200, description: 'City created successfully' })
  @ApiBody({ type: CreateCityDto })
  create(@Body() data: CreateCityDto) {
    return this.cityService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cities' })
  @ApiResponse({ status: 200, description: 'Cities fetched successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search by city name' })
  @ApiQuery({ name: 'countryId', required: false, type: String, description: 'Filter by country ID' })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('countryId') countryId?: string,
  ) {
    return this.cityService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search,
      countryId,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get city by id' })
  @ApiResponse({ status: 200, description: 'City fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a city' })
  @ApiResponse({ status: 200, description: 'City updated successfully' })
  @ApiBody({ type: UpdateCityDto })
  update(@Param('id') id: string, @Body() data: UpdateCityDto) {
    return this.cityService.update(id, data);
  }
}
