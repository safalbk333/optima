/**
 * TCP message pattern constants for the Budget module.
 * Shared between the Gateway (sender) and the microservice (@MessagePattern
 * receiver) so pattern strings never drift out of sync between the two sides.
 */
export const BUDGET_PATTERN = {
  FIND_ALL: 'budget.find_all',
  FIND_ONE: 'budget.find_one',
  CREATE: 'budget.create',
  UPDATE: 'budget.update',
  DELETE: 'budget.delete',
  VALIDATE: 'budget.validate',
};