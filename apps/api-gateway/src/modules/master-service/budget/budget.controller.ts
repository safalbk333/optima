import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

import { BudgetGatewayService } from './budget.service'; 
import { CreateBudgetDto } from './dto/create.budget.dto'; 
import { UpdateBudgetDto } from './dto/update.budget.dto'; 
import { ValidateBudgetDto } from './dto/validate.budget.dto'; 

@ApiTags('Budget')
@Controller('budget')
export class BudgetGatewayController {
  constructor(
    private readonly budgetService: BudgetGatewayService,
  ) {}

  // ─── Queries ──────────────────────────────────────────────────────────────

  @Get()
  @ApiOperation({
    summary: 'Get all budgets',
    description: 'Returns every active (non-deleted) budget, most recently created first.',
  })
  @ApiResponse({ status: 200, description: 'Budgets fetched successfully' })
  findAll() {
    return this.budgetService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a single budget by ID',
  })
  @ApiParam({ name: 'id', description: 'Budget UUID', type: String })
  @ApiResponse({ status: 200, description: 'Budget fetched successfully' })
  @ApiResponse({ status: 404, description: 'Budget not found' })
  findOne(@Param('id', ParseUUIDPipe) strId: string) {
    return this.budgetService.findOne(strId);
  }

  // ─── Mutations ────────────────────────────────────────────────────────────

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new budget',
    description:
      'Creates a budget record. `budget_code` must be unique, `allocated_amount` ' +
      'must be greater than 0, and `fk_department_id` (if provided) must reference ' +
      'an existing department.',
  })
  @ApiBody({ type: CreateBudgetDto })
  @ApiQuery({
    name: 'createdById',
    required: false,
    description: 'UUID of the user creating the record (audit trail)',
    type: String,
  })
  @ApiResponse({ status: 201, description: 'Budget created successfully' })
  @ApiResponse({
    status: 400,
    description: 'Duplicate budget_code, invalid allocated_amount, or department not found',
  })
  create(
    @Body() data: CreateBudgetDto,
    @Query('createdById') strCreatedById?: string,
  ) {
    return this.budgetService.create(data, strCreatedById);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a budget',
    description:
      'Updates budget fields. `budget_code` cannot collide with another budget, ' +
      'and `allocated_amount` cannot be set below the current `consumed_amount`.',
  })
  @ApiParam({ name: 'id', description: 'Budget UUID', type: String })
  @ApiBody({ type: UpdateBudgetDto })
  @ApiQuery({
    name: 'modifiedById',
    required: false,
    description: 'UUID of the user making the change (audit trail)',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Budget updated successfully' })
  @ApiResponse({
    status: 400,
    description: 'Duplicate budget_code or allocated_amount below consumed_amount',
  })
  @ApiResponse({ status: 404, description: 'Budget not found' })
  update(
    @Param('id', ParseUUIDPipe) strId: string,
    @Body() data: UpdateBudgetDto,
    @Query('modifiedById') strModifiedById?: string,
  ) {
    return this.budgetService.update(strId, data, strModifiedById);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Soft-delete a budget',
    description: 'Marks the budget as deleted (`is_delete = true`, `is_active = false`).',
  })
  @ApiParam({ name: 'id', description: 'Budget UUID', type: String })
  @ApiResponse({ status: 200, description: 'Budget deleted successfully' })
  @ApiResponse({ status: 404, description: 'Budget not found' })
  delete(@Param('id', ParseUUIDPipe) strId: string) {
    return this.budgetService.delete(strId);
  }

  // ─── Validation ───────────────────────────────────────────────────────────

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Validate a spend request against a budget',
    description:
      'Read-only check — never mutates `consumed_amount`. Returns whether the ' +
      'requested amount fits within the budget\'s remaining availability.',
  })
  @ApiBody({ type: ValidateBudgetDto })
  @ApiResponse({ status: 200, description: 'Validation result returned successfully' })
  @ApiResponse({ status: 404, description: 'Budget not found' })
  validate(@Body() data: ValidateBudgetDto) {
    return this.budgetService.validate(data);
  }
}