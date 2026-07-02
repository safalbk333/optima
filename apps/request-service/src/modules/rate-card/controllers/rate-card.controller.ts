import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { RateCardService } from '../services/rate-card.service';
import { CreateRateCardDto } from '../dto/rate-card/create-rate-card.dto';
import { UpdateRateCardDto } from '../dto/rate-card/update-rate-card.dto';
import { RateCardQueryDto } from '../dto/rate-card/rate-card-query.dto';
import { CloneRateCardDto } from '../dto/rate-card/clone-rate-card.dto';
import { RateCardResponseDto } from '../dto/rate-card/rate-card-response.dto';

@ApiTags('Rate Card')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rate-cards')
export class RateCardController {
  constructor(private readonly rateCardService: RateCardService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rate card (DRAFT status)' })
  @ApiResponse({ status: HttpStatus.CREATED, type: RateCardResponseDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateRateCardDto,
    @CurrentUser('pk_user_id') userId: string,
  ): Promise<RateCardResponseDto> {
    return this.rateCardService.create(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'List rate cards with filters and pagination' })
  @ApiResponse({ status: HttpStatus.OK })
  async findAll(@Query() query: RateCardQueryDto) {
    return this.rateCardService.findAll(query);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all currently ACTIVE rate cards' })
  @ApiResponse({ status: HttpStatus.OK, type: [RateCardResponseDto] })
  async getActive(): Promise<RateCardResponseDto[]> {
    return this.rateCardService.getActive();
  }

  @Get('expired')
  @ApiOperation({ summary: 'Get all EXPIRED rate cards' })
  @ApiResponse({ status: HttpStatus.OK, type: [RateCardResponseDto] })
  async getExpired(): Promise<RateCardResponseDto[]> {
    return this.rateCardService.getExpired();
  }

  @Get('expiring')
  @ApiOperation({ summary: 'Get ACTIVE rate cards expiring within N days' })
  @ApiQuery({ name: 'days', required: false, example: 30 })
  @ApiResponse({ status: HttpStatus.OK, type: [RateCardResponseDto] })
  async getExpiring(@Query('days') days?: string): Promise<RateCardResponseDto[]> {
    const parsedDays = days ? parseInt(days, 10) : 30;
    return this.rateCardService.getExpiring(parsedDays);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rate card by ID' })
  @ApiParam({ name: 'id', description: 'Rate card UUID' })
  @ApiResponse({ status: HttpStatus.OK, type: RateCardResponseDto })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<RateCardResponseDto> {
    return this.rateCardService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a rate card' })
  @ApiParam({ name: 'id', description: 'Rate card UUID' })
  @ApiResponse({ status: HttpStatus.OK, type: RateCardResponseDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRateCardDto,
    @CurrentUser('pk_user_id') userId: string,
  ): Promise<RateCardResponseDto> {
    return this.rateCardService.update(id, dto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft-delete a rate card (must not be ACTIVE)' })
  @ApiParam({ name: 'id', description: 'Rate card UUID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('pk_user_id') userId: string,
  ): Promise<void> {
    return this.rateCardService.remove(id, userId);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate a rate card' })
  @ApiParam({ name: 'id', description: 'Rate card UUID' })
  @ApiResponse({ status: HttpStatus.OK, type: RateCardResponseDto })
  async activate(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('pk_user_id') userId: string,
  ): Promise<RateCardResponseDto> {
    return this.rateCardService.activate(id, userId);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate a rate card' })
  @ApiParam({ name: 'id', description: 'Rate card UUID' })
  @ApiResponse({ status: HttpStatus.OK, type: RateCardResponseDto })
  async deactivate(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('pk_user_id') userId: string,
  ): Promise<RateCardResponseDto> {
    return this.rateCardService.deactivate(id, userId);
  }

  @Post(':id/clone')
  @ApiOperation({ summary: 'Clone a rate card including all items and pricing' })
  @ApiParam({ name: 'id', description: 'Rate card UUID to clone' })
  @ApiResponse({ status: HttpStatus.CREATED, type: RateCardResponseDto })
  @HttpCode(HttpStatus.CREATED)
  async clone(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CloneRateCardDto,
    @CurrentUser('pk_user_id') userId: string,
  ): Promise<RateCardResponseDto> {
    return this.rateCardService.clone(id, dto, userId);
  }
}