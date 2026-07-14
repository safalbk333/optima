import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { CreateBudgetDto } from './dto/create.budget.dto'; 
import { UpdateBudgetDto } from './dto/update.budget.dto'; 
import { ValidateBudgetDto } from './dto/validate.budget.dto'; 
import { BUDGET_PATTERN } from './budget.pattern'; 

@Injectable()
export class BudgetGatewayService {
  constructor(
    @Inject('MASTER_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  // ─── Queries ──────────────────────────────────────────────────────────────

  async findAll() {
    return firstValueFrom(
      this.client.send(BUDGET_PATTERN.FIND_ALL, {}),
    );
  }

  async findOne(strId: string) {
    return firstValueFrom(
      this.client.send(BUDGET_PATTERN.FIND_ONE, strId),
    );
  }

  // ─── Mutations ────────────────────────────────────────────────────────────

  async create(data: CreateBudgetDto, strCreatedById?: string) {
    return firstValueFrom(
      this.client.send(BUDGET_PATTERN.CREATE, { data, strCreatedById }),
    );
  }

  async update(strId: string, data: UpdateBudgetDto, strModifiedById?: string) {
    return firstValueFrom(
      this.client.send(BUDGET_PATTERN.UPDATE, { strId, data, strModifiedById }),
    );
  }

  async delete(strId: string) {
    return firstValueFrom(
      this.client.send(BUDGET_PATTERN.DELETE, strId),
    );
  }

  // ─── Validation ───────────────────────────────────────────────────────────

  async validate(data: ValidateBudgetDto) {
    return firstValueFrom(
      this.client.send(BUDGET_PATTERN.VALIDATE, data),
    );
  }
}