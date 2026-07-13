import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { DEPARTMENT_PATTERN } from './department.pattern';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentGatewayService {
  private readonly logger: Logger;

  constructor(
    @Inject('MASTER_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(DepartmentGatewayService.name);
  }

  async create(strSchemaId: string, data: CreateDepartmentDto) {
    try {
      return await firstValueFrom(
        this.client.send(DEPARTMENT_PATTERN.CREATE, { schemaId: strSchemaId, data }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findAll(strSchemaId: string, payload: { limit?: number; page?: number; search?: string }) {
    try {
      return await firstValueFrom(
        this.client.send(DEPARTMENT_PATTERN.FIND_ALL, { schemaId: strSchemaId, ...payload }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(strSchemaId: string, id: string) {
    try {
      return await firstValueFrom(
        this.client.send(DEPARTMENT_PATTERN.FIND_ONE, { schemaId: strSchemaId, id }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async update(strSchemaId: string, id: string, data: UpdateDepartmentDto) {
    try {
      return await firstValueFrom(
        this.client.send(DEPARTMENT_PATTERN.UPDATE, { schemaId: strSchemaId, id, data }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
