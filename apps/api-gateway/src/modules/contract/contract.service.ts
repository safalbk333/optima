import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { CONTRACT_PATTERN } from './contract.pattern';

@Injectable()
export class ContractGatewayService {
  constructor(
    @Inject('CONTRACTS_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async findAll() {
    return await firstValueFrom(
      this.client.send(
        CONTRACT_PATTERN.FIND_ALL,
        {},
      ),
    );
  }

  async findOne(id: string) {
    return await firstValueFrom(
      this.client.send(
        CONTRACT_PATTERN.FIND_ONE,
        id,
      ),
    );
  }

  async create(data: CreateContractDto) {
    return await firstValueFrom(
      this.client.send(
        CONTRACT_PATTERN.CREATE,
        data,
      ),
    );
  }

  async update(
    id: string,
    data: UpdateContractDto,
  ) {
    return await firstValueFrom(
      this.client.send(
        CONTRACT_PATTERN.UPDATE,
        { id, data },
      ),
    );
  }
}
