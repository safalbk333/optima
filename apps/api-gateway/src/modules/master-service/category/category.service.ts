import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MoveCategoryDto } from './dto/move-category.dto';
import { CATEGORY_PATTERN } from './category.pattern';

@Injectable()
export class CategoryGatewayService {
  constructor(
    @Inject('MASTER_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  // ─── Queries ──────────────────────────────────────────────────────────────

  async findAll() {
    return firstValueFrom(
      this.client.send(CATEGORY_PATTERN.FIND_ALL, {}),
    );
  }

  async findRoots() {
    return firstValueFrom(
      this.client.send(CATEGORY_PATTERN.FIND_ROOTS, {}),
    );
  }

  async findOne(strId: string) {
    return firstValueFrom(
      this.client.send(CATEGORY_PATTERN.FIND_ONE, strId),
    );
  }

  async findSubtree(strId: string) {
    return firstValueFrom(
      this.client.send(CATEGORY_PATTERN.FIND_SUBTREE, strId),
    );
  }

  async findAncestors(strId: string) {
    return firstValueFrom(
      this.client.send(CATEGORY_PATTERN.FIND_ANCESTORS, strId),
    );
  }

  // ─── Mutations ────────────────────────────────────────────────────────────

  async create(data: CreateCategoryDto, strCreatedById?: string) {
    return firstValueFrom(
      this.client.send(CATEGORY_PATTERN.CREATE, { data, strCreatedById }),
    );
  }

  async update(strId: string, data: UpdateCategoryDto, strModifiedById?: string) {
    return firstValueFrom(
      this.client.send(CATEGORY_PATTERN.UPDATE, { strId, data, strModifiedById }),
    );
  }

  async move(strId: string, data: MoveCategoryDto, strModifiedById?: string) {
    return firstValueFrom(
      this.client.send(CATEGORY_PATTERN.MOVE, { strId, data, strModifiedById }),
    );
  }

  async delete(strId: string, blnCascade = false) {
    return firstValueFrom(
      this.client.send(CATEGORY_PATTERN.DELETE, { strId, blnCascade }),
    );
  }
}