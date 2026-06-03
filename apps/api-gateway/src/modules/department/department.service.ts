import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { DEPARTMENT_PATTERN } from './department.pattern';

@Injectable()
export class DepartmentGatewayService {
  private readonly logger: Logger;

  constructor(
    @Inject('MASTER_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(DepartmentGatewayService.name);
  }

  async create(data: any) {
    try {
      return await firstValueFrom(
        this.client.send(
          DEPARTMENT_PATTERN.CREATE,
          data,
        ),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await firstValueFrom(
        this.client.send(
          DEPARTMENT_PATTERN.FIND_ALL,
          {},
        ),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await firstValueFrom(
        this.client.send(
          DEPARTMENT_PATTERN.FIND_ONE,
          { id },
        ),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      return await firstValueFrom(
        this.client.send(
          DEPARTMENT_PATTERN.UPDATE,
          { id, ...updateDepartmentDto },
        ),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
