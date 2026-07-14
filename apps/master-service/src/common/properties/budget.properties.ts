/**
 * Centralized log / response message strings for the Budget module.
 * Mirrors the structure used by CategoryProperties so that log messages
 * stay consistent and easy to audit across modules.
 */
export const BudgetProperties = {
  controller: {
    create: {
      received: 'BudgetController: received request to create budget',
      success: 'BudgetController: create budget request completed',
      error: 'BudgetController: error while creating budget',
    },
    findAll: {
      received: 'BudgetController: received request to fetch all budgets',
      success: 'BudgetController: fetch all budgets request completed',
      error: 'BudgetController: error while fetching budgets',
    },
    findOne: {
      received: 'BudgetController: received request to fetch budget by id',
      success: 'BudgetController: fetch budget by id request completed',
      error: 'BudgetController: error while fetching budget by id',
    },
    update: {
      received: 'BudgetController: received request to update budget',
      success: 'BudgetController: update budget request completed',
      error: 'BudgetController: error while updating budget',
    },
    delete: {
      received: 'BudgetController: received request to delete budget',
      success: 'BudgetController: delete budget request completed',
      error: 'BudgetController: error while deleting budget',
    },
    validate: {
      received: 'BudgetController: received request to validate budget',
      success: 'BudgetController: validate budget request completed',
      error: 'BudgetController: error while validating budget',
    },
  },
  service: {
    create: {
      start: 'BudgetService.create: creating new budget',
      duplicateCode: 'BudgetService.create: budget_code already exists',
      invalidAmount: 'BudgetService.create: allocated_amount must be greater than 0',
      departmentNotFound: 'BudgetService.create: department not found',
      success: 'BudgetService.create: budget created successfully',
      error: 'BudgetService.create: failed to create budget',
    },
    findAll: {
      start: 'BudgetService.findAll: fetching budgets',
      success: 'BudgetService.findAll: budgets fetched successfully',
      error: 'BudgetService.findAll: failed to fetch budgets',
    },
    findOne: {
      start: 'BudgetService.findOne: fetching budget by id',
      notFound: 'BudgetService.findOne: budget not found',
      success: 'BudgetService.findOne: budget fetched successfully',
      error: 'BudgetService.findOne: failed to fetch budget',
    },
    update: {
      start: 'BudgetService.update: updating budget',
      notFound: 'BudgetService.update: budget not found',
      duplicateCode: 'BudgetService.update: budget_code already exists',
      belowConsumed:
        'BudgetService.update: allocated_amount cannot be less than consumed_amount',
      departmentNotFound: 'BudgetService.update: department not found',
      success: 'BudgetService.update: budget updated successfully',
      error: 'BudgetService.update: failed to update budget',
    },
    delete: {
      start: 'BudgetService.delete: deleting budget',
      notFound: 'BudgetService.delete: budget not found',
      success: 'BudgetService.delete: budget deleted successfully',
      error: 'BudgetService.delete: failed to delete budget',
    },
    validateBudget: {
      start: 'BudgetService.validateBudget: validating requested amount against budget',
      notFound: 'BudgetService.validateBudget: budget not found',
      success: 'BudgetService.validateBudget: validation completed successfully',
      error: 'BudgetService.validateBudget: failed to validate budget',
    },
  },
};