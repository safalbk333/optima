import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { MilestonePriceService } from '../services/milestone-price.service';
import { CreateMilestonePriceDto } from '../dto/milestone-price/create-milestone-price.dto';
import { UpdateMilestonePriceDto } from '../dto/milestone-price/update-milestone-price.dto';

@ApiTags('Rate Card - Milestone Pricing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rate-cards/:rateCardId/items/:itemId/milestones')
export class MilestonePriceController {
  constructor(private readonly milestonePriceService: MilestonePriceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a milestone price for a rate card item' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('rateCardId', ParseUUIDPipe) rateCardId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Body() dto: CreateMilestonePriceDto,
  ) {
    return this.milestonePriceService.create(rateCardId, itemId, dto);
  }

  @Patch(':milestoneId')
  @ApiOperation({ summary: 'Update a milestone price' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiParam({ name: 'milestoneId', description: 'Milestone UUID' })
  @ApiResponse({ status: HttpStatus.OK })
  async update(
    @Param('rateCardId', ParseUUIDPipe) rateCardId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Param('milestoneId', ParseUUIDPipe) milestoneId: string,
    @Body() dto: UpdateMilestonePriceDto,
  ) {
    return this.milestonePriceService.update(rateCardId, itemId, milestoneId, dto);
  }

  @Delete(':milestoneId')
  @ApiOperation({ summary: 'Delete a milestone price' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiParam({ name: 'milestoneId', description: 'Milestone UUID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('rateCardId', ParseUUIDPipe) rateCardId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Param('milestoneId', ParseUUIDPipe) milestoneId: string,
  ): Promise<void> {
    return this.milestonePriceService.delete(rateCardId, itemId, milestoneId);
  }
}