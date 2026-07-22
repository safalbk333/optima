import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApprovalLevelGatewayService } from './approval.service';
import { CreateApprovalLevelDto, UpdateApprovalLevelDto } from './dto/approval.dto';

@ApiTags('Approval Level')
@Controller('approval-levels')
export class ApprovalLevelController {
  constructor(
    private readonly approvalLevelService: ApprovalLevelGatewayService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create new approval level' })
  @ApiResponse({ status: 201, description: 'Approval level created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createDto: CreateApprovalLevelDto) {
    return this.approvalLevelService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all approval levels' })
  @ApiResponse({ status: 200, description: 'Returns all approval levels' })
  findAll() {
    return this.approvalLevelService.findAll();
  }

  @Get(':level')
  @ApiOperation({ summary: 'Get approval level by level' })
  @ApiResponse({ status: 200, description: 'Returns approval level details' })
  @ApiResponse({ status: 404, description: 'Approval level not found' })
  findOne(@Param('level') level: string) {
    return this.approvalLevelService.findOne(level);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update approval level' })
  @ApiResponse({ status: 200, description: 'Approval level updated successfully' })
  @ApiResponse({ status: 404, description: 'Approval level not found' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateApprovalLevelDto,
  ) {
    return this.approvalLevelService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete approval level' })
  @ApiResponse({ status: 200, description: 'Approval level deleted successfully' })
  @ApiResponse({ status: 404, description: 'Approval level not found' })
  delete(@Param('id') id: string) {
    return this.approvalLevelService.delete(id);
  }
}
