import {
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RoleGatewayService {
  private readonly logger: Logger;
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(RoleGatewayService.name);
  }

  async findAll() {
    try{
      return await firstValueFrom(
        this.client.send(
          'role.findAll',
          {},
        ),
      );
    }catch(error){
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async create(data: any) {
    try{
      return await firstValueFrom(
        this.client.send(
          'role.create',
          data,
        ),
      );
    }catch(error){
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(id: string) {
    try{
      return await firstValueFrom(
        this.client.send(
          'role.findOne',
          { id },
        ),
      );
    }catch(error){
      this.logger.error(error.message, error);
      throw error;
    }
  }
}