import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BudgetService } from './budget.service';
import { AppLogger } from '../../common/logger/app.logger';
import { BudgetProperties } from '../../common/properties/budget.properties';
import { BUDGET_PATTERN } from './budget.pattern';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { ValidateBudgetDto } from './dto/validate-budget.dto';

/**
 * BudgetController
 *
 * TCP microservice controller exposing the Budget module to the API
 * Gateway via @MessagePattern handlers.
 *
 * Follows the same conventions as BudgetService:
 *  - AppLogger instantiated per-class (not injected)
 *  - Errors are logged then rethrown so the microservice exception
 *    filter / API Gateway can translate them into the proper response
 */
@Controller('budget')
export class BudgetController {
  private readonly logger = new AppLogger(BudgetController.name);

  constructor(private readonly budgetService: BudgetService) {}

  @MessagePattern(BUDGET_PATTERN.FIND_ALL)
  async findAll() {
    try {
      this.logger.log(BudgetProperties.controller.findAll.received);
      const result = await this.budgetService.findAll();
      this.logger.log(BudgetProperties.controller.findAll.success);
      return result;
    } catch (error) {
      this.logger.error(BudgetProperties.controller.findAll.error, error.stack);
      throw error;
    }
  }

  @MessagePattern(BUDGET_PATTERN.FIND_ONE)
  async findOne(@Payload() strId: string) {
    try {
      this.logger.log(`${BudgetProperties.controller.findOne.received}: ${strId}`);
      const result = await this.budgetService.findOne(strId);
      this.logger.log(`${BudgetProperties.controller.findOne.success}: ${strId}`);
      return result;
    } catch (error) {
      this.logger.error(
        `${BudgetProperties.controller.findOne.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  @MessagePattern(BUDGET_PATTERN.CREATE)
  async create(@Payload() payload: CreateBudgetDto) {
    try {
      this.logger.log(BudgetProperties.controller.create.received);
      const result = await this.budgetService.create(payload);
      this.logger.log(BudgetProperties.controller.create.success);
      return result;
    } catch (error) {
      this.logger.error(BudgetProperties.controller.create.error, error.stack);
      throw error;
    }
  }

  @MessagePattern(BUDGET_PATTERN.UPDATE)
  async update(@Payload() payload: UpdateBudgetDto) {
    try {
      this.logger.log(`${BudgetProperties.controller.update.received}: ${payload.strBudgetId}`);
      const result = await this.budgetService.update(payload);
      this.logger.log(`${BudgetProperties.controller.update.success}: ${payload.strBudgetId}`);
      return result;
    } catch (error) {
      this.logger.error(
        `${BudgetProperties.controller.update.error}: ${payload.strBudgetId}`,
        error.stack,
      );
      throw error;
    }
  }

  @MessagePattern(BUDGET_PATTERN.DELETE)
  async delete(@Payload() strId: string) {
    try {
      this.logger.log(`${BudgetProperties.controller.delete.received}: ${strId}`);
      const result = await this.budgetService.delete(strId);
      this.logger.log(`${BudgetProperties.controller.delete.success}: ${strId}`);
      return result;
    } catch (error) {
      this.logger.error(
        `${BudgetProperties.controller.delete.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  @MessagePattern(BUDGET_PATTERN.VALIDATE)
  async validate(@Payload() payload: ValidateBudgetDto) {
    try {
      this.logger.log(`${BudgetProperties.controller.validate.received}: ${payload.strBudgetId}`);
      const result = await this.budgetService.validateBudgetFromDto(payload);
      this.logger.log(`${BudgetProperties.controller.validate.success}: ${payload.strBudgetId}`);
      return result;
    } catch (error) {
      this.logger.error(
        `${BudgetProperties.controller.validate.error}: ${payload.strBudgetId}`,
        error.stack,
      );
      throw error;
    }
  }
}