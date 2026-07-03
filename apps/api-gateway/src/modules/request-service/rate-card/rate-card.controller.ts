import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RateCardGatewayService } from './rate-card.service';
import { CreateRateCardDto } from './dto/create-rate-card.dto';
import { UpdateRateCardDto } from './dto/update-rate-card.dto';
import { CloneRateCardDto } from './dto/clone-rate-card.dto';
import { RateCardQueryDto } from './dto/rate-card-query.dto';

@ApiTags('Rate Card')
@Controller('rate-cards')
export class RateCardGatewayController {
  constructor(private readonly rateCardService: RateCardGatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rate card' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Rate card created successfully' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateRateCardDto, @Req() req: any) {
    return this.rateCardService.create(dto, req.user?.pk_user_id);
  }

  @Get()
  @ApiOperation({ summary: 'List rate cards with filters and pagination' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Rate card list fetched successfully' })
  findAll(@Query() query: RateCardQueryDto) {
    return this.rateCardService.findAll(query);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active rate cards' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Active rate cards fetched successfully' })
  getActive() {
    return this.rateCardService.getActive();
  }

  @Get('expired')
  @ApiOperation({ summary: 'Get all expired rate cards' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Expired rate cards fetched successfully' })
  getExpired() {
    return this.rateCardService.getExpired();
  }

  @Get('expiring')
  @ApiOperation({ summary: 'Get rate cards expiring within N days' })
  @ApiQuery({ name: 'days', required: false, example: 30 })
  @ApiResponse({ status: HttpStatus.OK, description: 'Expiring rate cards fetched successfully' })
  getExpiring(@Query('days') days?: string) {
    return this.rateCardService.getExpiring(days ? parseInt(days, 10) : 30);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get rate card by ID' })
  @ApiParam({ name: 'id', description: 'Rate card UUID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Rate card fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.rateCardService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a rate card' })
  @ApiParam({ name: 'id', description: 'Rate card UUID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Rate card updated successfully' })
  update(@Param('id') id: string, @Body() dto: UpdateRateCardDto, @Req() req: any) {
    return this.rateCardService.update(id, dto, req.user?.pk_user_id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a rate card' })
  @ApiParam({ name: 'id', description: 'Rate card UUID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Rate card deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() req: any) {
    return this.rateCardService.remove(id, req.user?.pk_user_id);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate a rate card' })
  @ApiParam({ name: 'id', description: 'Rate card UUID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Rate card activated successfully' })
  activate(@Param('id') id: string, @Req() req: any) {
    return this.rateCardService.activate(id, req.user?.pk_user_id);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate a rate card' })
  @ApiParam({ name: 'id', description: 'Rate card UUID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Rate card deactivated successfully' })
  deactivate(@Param('id') id: string, @Req() req: any) {
    return this.rateCardService.deactivate(id, req.user?.pk_user_id);
  }

  @Post(':id/clone')
  @ApiOperation({ summary: 'Clone a rate card with all items and pricing' })
  @ApiParam({ name: 'id', description: 'Rate card UUID to clone' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Rate card cloned successfully' })
  @HttpCode(HttpStatus.CREATED)
  clone(@Param('id') id: string, @Body() dto: CloneRateCardDto, @Req() req: any) {
    return this.rateCardService.clone(id, dto, req.user?.pk_user_id);
  }
}