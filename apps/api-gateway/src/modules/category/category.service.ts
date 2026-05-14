import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CATEGORY_PATTERN } from './category.pattern';

@Injectable()
export class CategoryGatewayService {
  constructor(
    @Inject('VENDOR_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async findAll() {
    return await firstValueFrom(
      this.client.send(
        CATEGORY_PATTERN.FIND_ALL,
        {},
      ),
    );
  }

  async findOne(id: string) {
    return await firstValueFrom(
      this.client.send(
        CATEGORY_PATTERN.FIND_ONE,
        id,
      ),
    );
  }

  async create(data: CreateCategoryDto) {
    return await firstValueFrom(
      this.client.send(
        CATEGORY_PATTERN.CREATE,
        data,
      ),
    );
  }

  async update(
    id: string,
    data: UpdateCategoryDto,
  ) {
    return await firstValueFrom(
      this.client.send(
        CATEGORY_PATTERN.UPDATE,
        { id, data },
      ),
    );
  }

  async delete(id: string) {
    return await firstValueFrom(
      this.client.send(
        CATEGORY_PATTERN.DELETE,
        id,
      ),
    );
  }
}
