import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RateCardGatewayService } from './rate-card.service';
import { CreateMilestonePriceDto } from './dto/create-milestone-price.dto';
import { UpdateMilestonePriceDto } from './dto/update-milestone-price.dto';

@ApiTags('Rate Card - Milestone Pricing')
@Controller('rate-cards/:rateCardId/items/:itemId/milestones')
export class MilestonePriceGatewayController {
  constructor(private readonly rateCardService: RateCardGatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a milestone price for a rate card item' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Milestone created successfully' })
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('rateCardId') rateCardId: string,
    @Param('itemId') itemId: string,
    @Body() dto: CreateMilestonePriceDto,
  ) {
    return this.rateCardService.createMilestone(rateCardId, itemId, dto);
  }

  @Patch(':milestoneId')
  @ApiOperation({ summary: 'Update a milestone price' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiParam({ name: 'milestoneId', description: 'Milestone UUID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Milestone updated successfully' })
  update(
    @Param('rateCardId') rateCardId: string,
    @Param('itemId') itemId: string,
    @Param('milestoneId') milestoneId: string,
    @Body() dto: UpdateMilestonePriceDto,
  ) {
    return this.rateCardService.updateMilestone(rateCardId, itemId, milestoneId, dto);
  }

  @Delete(':milestoneId')
  @ApiOperation({ summary: 'Delete a milestone price' })
  @ApiParam({ name: 'rateCardId', description: 'Rate card UUID' })
  @ApiParam({ name: 'itemId', description: 'Rate card item UUID' })
  @ApiParam({ name: 'milestoneId', description: 'Milestone UUID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Milestone deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param('rateCardId') rateCardId: string,
    @Param('itemId') itemId: string,
    @Param('milestoneId') milestoneId: string,
  ) {
    return this.rateCardService.deleteMilestone(rateCardId, itemId, milestoneId);
  }
}