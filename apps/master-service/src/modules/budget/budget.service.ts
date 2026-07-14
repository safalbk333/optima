import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from ".././../../../../libs/database/prisma-service";
import { ResponseHelper } from "libs/common/utils/helper/response.helper";
import { AppLogger } from '../../common/logger/app.logger';
import { BudgetProperties } from '../../common/properties/budget.properties';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { ValidateBudgetDto } from './dto/validate-budget.dto';

/**
 * BudgetService
 *
 * Handles all business logic for the Budget module:
 *  - CRUD operations on tbl_budget
 *  - Soft delete semantics: is_active = false (tbl_budget has no
 *    is_delete column, unlike some other tables in this project)
 *  - available_amount is a required, non-computed stored column
 *    (allocated_amount - consumed_amount). This service keeps it in sync
 *    whenever allocated_amount changes. IMPORTANT: any other code path
 *    that mutates consumed_amount (e.g. a PO-approval flow elsewhere in
 *    the app) must also recompute and persist available_amount, or this
 *    column will drift out of sync with allocated/consumed.
 *  - Budget availability validation used by downstream procurement flows
 *
 * Follows the same conventions as CategoryService:
 *  - PrismaService for data access
 *  - ResponseHelper for consistent response envelopes
 *  - AppLogger for structured logging (instantiated per-class, not injected)
 *  - BudgetProperties for centralized log message strings
 *  - DTOs use Hungarian-notation fields; service maps them onto the
 *    snake_case Prisma columns
 */
@Injectable()
export class BudgetService {
  private readonly logger = new AppLogger(BudgetService.name);
  private schemaClient: any;

  constructor(private readonly prisma: PrismaService) {}

  // ─── Client ───────────────────────────────────────────────────────────────

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient = await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  // ─── Internal helpers ─────────────────────────────────────────────────────

  /**
   * Throws BadRequestException if a budget_code is already used by another
   * (non-deleted) budget record.
   */
  private async ensureBudgetCodeIsUnique(
    strBudgetCode: string,
    strExcludeBudgetId?: string,
  ): Promise<void> {
    const prisma = await this.getSchemaClient();

    const objExisting = await prisma.tbl_budget.findFirst({
      where: {
        budget_code: strBudgetCode,
        is_active: true,
        ...(strExcludeBudgetId ? { pk_budget_id: { not: strExcludeBudgetId } } : {}),
      },
    });

    if (objExisting) {
      throw new BadRequestException('budget_code already exists');
    }
  }

  /**
   * Throws BadRequestException if the referenced department does not exist.
   */
  private async ensureDepartmentExists(strDepartmentId: string): Promise<void> {
    const prisma = await this.getSchemaClient();

    // tbl_department has no is_delete column (confirmed against schema) —
    // is_active is the sole soft-delete flag, same as tbl_budget.
    const objDepartment = await prisma.tbl_department.findFirst({
      where: {
        pk_department_id: strDepartmentId,
        is_active: true,
      },
    });

    if (!objDepartment) {
      throw new BadRequestException('Department not found');
    }
  }

  /**
   * Fetches a single active budget record or throws NotFoundException.
   */
  private async getBudgetOrFail(strId: string) {
    const prisma = await this.getSchemaClient();

    const objBudget = await prisma.tbl_budget.findFirst({
      where: {
        pk_budget_id: strId,
        is_active: true,
      },
    });

    if (!objBudget) {
      throw new NotFoundException(`Budget not found: ${strId}`);
    }

    return objBudget;
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  /**
   * Returns all active (non-deleted) budgets, most recently created first.
   */
  async findAll() {
    try {
      this.logger.log(BudgetProperties.service.findAll.start);
      const prisma = await this.getSchemaClient();

      const arrBudgets = await prisma.tbl_budget.findMany({
        where: { is_active: true },
        include: { department: true },
        orderBy: { created: 'desc' },
      });

      this.logger.log(BudgetProperties.service.findAll.success);
      return ResponseHelper.success(arrBudgets, "Budgets fetched successfully");
    } catch (error) {
      this.logger.error(BudgetProperties.service.findAll.error, error.stack);
      return ResponseHelper.error("Failed to fetch budgets", error.message);
    }
  }

  /**
   * Returns a single active budget by its primary key.
   * Throws NotFoundException if it does not exist or has been deleted.
   */
  async findOne(strId: string) {
    try {
      this.logger.log(`${BudgetProperties.service.findOne.start}: ${strId}`);

      const objBudget = await this.getBudgetOrFail(strId);

      this.logger.log(`${BudgetProperties.service.findOne.success}: ${strId}`);
      return ResponseHelper.success(objBudget, "Budget fetched successfully");
    } catch (error) {
      this.logger.error(
        `${BudgetProperties.service.findOne.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Creates a new budget record.
   *
   * Business rules enforced:
   *  - budget_code must be unique
   *  - allocated_amount must be greater than 0
   *  - fiscal_year is required
   *  - department must exist if strDepartmentId is provided
   */
  async create(objData: CreateBudgetDto) {
    try {
      this.logger.log(BudgetProperties.service.create.start);

      if (objData.numAllocatedAmount === undefined || objData.numAllocatedAmount <= 0) {
        this.logger.warn(BudgetProperties.service.create.invalidAmount);
        throw new BadRequestException('numAllocatedAmount must be greater than 0');
      }

      await this.ensureBudgetCodeIsUnique(objData.strBudgetCode);

      if (objData.strDepartmentId) {
        await this.ensureDepartmentExists(objData.strDepartmentId);
      }

      const prisma = await this.getSchemaClient();

      // available_amount is a required, plain (non-computed) column — must
      // be set explicitly. On create, consumed_amount is always 0, so
      // available_amount starts out equal to allocated_amount.
      const objBudget = await prisma.tbl_budget.create({
        data: {
          budget_code: objData.strBudgetCode,
          budget_name: objData.strBudgetName,
          fiscal_year: objData.intFiscalYear,
          allocated_amount: new Prisma.Decimal(objData.numAllocatedAmount),
          consumed_amount: new Prisma.Decimal(0),
          available_amount: new Prisma.Decimal(objData.numAllocatedAmount),
          fk_department_id: objData.strDepartmentId ?? null,
          fk_created_id: objData.strCreatedById ?? null,
          is_active: true,
        },
      });

      this.logger.log(`${BudgetProperties.service.create.success}: ${objBudget.pk_budget_id}`);
      return ResponseHelper.success(objBudget, "Budget created successfully");
    } catch (error) {
      this.logger.error(BudgetProperties.service.create.error, error.stack);
      throw error;
    }
  }

  /**
   * Updates an existing budget record.
   *
   * Business rules enforced:
   *  - budget must exist
   *  - budget_code cannot collide with another budget's code
   *  - allocated_amount cannot be set below consumed_amount
   *  - department must exist if strDepartmentId is provided
   */
  async update(objData: UpdateBudgetDto) {
    try {
      this.logger.log(`${BudgetProperties.service.update.start}: ${objData.strBudgetId}`);

      const objExistingBudget = await this.getBudgetOrFail(objData.strBudgetId);

      if (objData.strBudgetCode && objData.strBudgetCode !== objExistingBudget.budget_code) {
        await this.ensureBudgetCodeIsUnique(objData.strBudgetCode, objData.strBudgetId);
      }

      if (objData.strDepartmentId) {
        await this.ensureDepartmentExists(objData.strDepartmentId);
      }

      if (objData.numAllocatedAmount !== undefined) {
        const numConsumedAmount = Number(objExistingBudget.consumed_amount);

        if (objData.numAllocatedAmount < numConsumedAmount) {
          this.logger.warn(BudgetProperties.service.update.belowConsumed);
          throw new BadRequestException(
            'numAllocatedAmount cannot be less than consumed_amount',
          );
        }
      }

      const prisma = await this.getSchemaClient();

      // Keep the stored available_amount column in sync whenever
      // allocated_amount changes (consumed_amount is not touched here).
      const numConsumedAmount = Number(objExistingBudget.consumed_amount);
      const numNewAllocatedAmount =
        objData.numAllocatedAmount !== undefined
          ? objData.numAllocatedAmount
          : Number(objExistingBudget.allocated_amount);
      const numNewAvailableAmount = numNewAllocatedAmount - numConsumedAmount;

      const objBudget = await prisma.tbl_budget.update({
        where: { pk_budget_id: objData.strBudgetId },
        data: {
          ...(objData.strBudgetCode !== undefined ? { budget_code: objData.strBudgetCode } : {}),
          ...(objData.strBudgetName !== undefined ? { budget_name: objData.strBudgetName } : {}),
          ...(objData.intFiscalYear !== undefined ? { fiscal_year: objData.intFiscalYear } : {}),
          ...(objData.numAllocatedAmount !== undefined
            ? {
                allocated_amount: new Prisma.Decimal(objData.numAllocatedAmount),
                available_amount: new Prisma.Decimal(numNewAvailableAmount),
              }
            : {}),
          ...(objData.strDepartmentId !== undefined
            ? { fk_department_id: objData.strDepartmentId }
            : {}),
          modified: new Date(),
          fk_modified_id: objData.strModifiedById ?? null,
        },
      });

      this.logger.log(`${BudgetProperties.service.update.success}: ${objData.strBudgetId}`);
      return ResponseHelper.success(objBudget, "Budget updated successfully");
    } catch (error) {
      this.logger.error(
        `${BudgetProperties.service.update.error}: ${objData.strBudgetId}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Soft deletes a budget record by setting is_active = false.
   * No rows are physically removed. (tbl_budget has no is_delete column —
   * is_active is the sole soft-delete flag for this table.)
   */
  async delete(strId: string) {
    try {
      this.logger.log(`${BudgetProperties.service.delete.start}: ${strId}`);

      await this.getBudgetOrFail(strId);

      const prisma = await this.getSchemaClient();

      const objBudget = await prisma.tbl_budget.update({
        where: { pk_budget_id: strId },
        data: {
          is_active: false,
          modified: new Date(),
        },
      });

      this.logger.log(`${BudgetProperties.service.delete.success}: ${strId}`);
      return ResponseHelper.success(objBudget, "Budget deleted successfully");
    } catch (error) {
      this.logger.error(
        `${BudgetProperties.service.delete.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  // ─── Budget validation ──────────────────────────────────────────────────────

  /**
   * Validates whether a requested spend amount fits within a budget's
   * remaining availability. This method is READ-ONLY: it never mutates
   * consumed_amount or any other field on the budget.
   *
   * availableAmount = allocated_amount - consumed_amount
   *
   * If numRequestedAmount <= availableAmount:
   *   { isValid: true, requiresOverride: false, availableAmount }
   * Else:
   *   { isValid: false, requiresOverride: true, availableAmount, requestedAmount }
   */
  async validateBudget(strBudgetId: string, numRequestedAmount: number) {
    try {
      this.logger.log(`${BudgetProperties.service.validateBudget.start}: ${strBudgetId}`);

      const objBudget = await this.getBudgetOrFail(strBudgetId);

      const numAllocatedAmount = Number(objBudget.allocated_amount);
      const numConsumedAmount = Number(objBudget.consumed_amount);
      const numAvailableAmount = numAllocatedAmount - numConsumedAmount;

      const blnIsValid = numRequestedAmount <= numAvailableAmount;

      const objResult = blnIsValid
        ? {
            isValid: true,
            requiresOverride: false,
            availableAmount: numAvailableAmount,
          }
        : {
            isValid: false,
            requiresOverride: true,
            availableAmount: numAvailableAmount,
            requestedAmount: numRequestedAmount,
          };

      this.logger.log(`${BudgetProperties.service.validateBudget.success}: ${strBudgetId}`);
      return ResponseHelper.success(objResult, "Budget validated successfully");
    } catch (error) {
      this.logger.error(
        `${BudgetProperties.service.validateBudget.error}: ${strBudgetId}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Helper used by ValidateBudgetDto-based callers (e.g. the microservice
   * controller) to unpack the DTO before delegating to validateBudget().
   */
  async validateBudgetFromDto(objData: ValidateBudgetDto) {
    return this.validateBudget(objData.strBudgetId, objData.numRequestedAmount);
  }
}