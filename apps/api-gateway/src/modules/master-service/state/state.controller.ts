import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SchemaId } from '../../guards/decorators/schema-id.decorator';
import { StateGatewayService } from './state.service';
import { CreateStateDto, UpdateStateDto } from './dto/state.dto';

@ApiTags('State')
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateGatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new state' })
  @ApiResponse({ status: 200, description: 'State created successfully' })
  @ApiBody({ type: CreateStateDto })
  create(
    @SchemaId() schemaId: string,
    @Body() data: CreateStateDto,
  ) {
    return this.stateService.create(schemaId, data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all states' })
  @ApiResponse({ status: 200, description: 'States fetched successfully' })
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
    return this.stateService.findAll(schemaId, {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search,
      countryId,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get state by id' })
  @ApiResponse({ status: 200, description: 'State fetched successfully' })
  findOne(
    @SchemaId() schemaId: string,
    @Param('id') id: string,
  ) {
    return this.stateService.findOne(schemaId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a state' })
  @ApiResponse({ status: 200, description: 'State updated successfully' })
  @ApiBody({ type: UpdateStateDto })
  update(
    @SchemaId() schemaId: string,
    @Param('id') id: string,
    @Body() data: UpdateStateDto,
  ) {
    return this.stateService.update(schemaId, id, data);
  }
}
