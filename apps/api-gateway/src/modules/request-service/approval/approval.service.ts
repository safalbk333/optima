import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateApprovalLevelDto, UpdateApprovalLevelDto } from './dto/approval.dto';
import { APPROVAL_LEVEL_PATTERN } from './approval.pattern';

@Injectable()
export class ApprovalLevelGatewayService {
  constructor(
    @Inject('REQUEST_SERVICE')
    private readonly client: ClientProxy,
  ) { }

  async create(data: CreateApprovalLevelDto) {
    return await firstValueFrom(
      this.client.send(
        APPROVAL_LEVEL_PATTERN.CREATE,
        data,
      ),
    );
  }
  async findAll() {
    return await firstValueFrom(
      this.client.send(
        APPROVAL_LEVEL_PATTERN.FIND_ALL,
        {},
      ),
    );
  }

  async findOne(level: string) {
    return await firstValueFrom(
      this.client.send(
        APPROVAL_LEVEL_PATTERN.FIND_ONE,
        level,
      ),
    );
  }

  async update(
    id: string,
    data: UpdateApprovalLevelDto,
  ) {
    return await firstValueFrom(
      this.client.send(
        APPROVAL_LEVEL_PATTERN.UPDATE,
        { id, data },
      ),
    );
  }

  async delete(id: string) {
    return await firstValueFrom(
      this.client.send(
        APPROVAL_LEVEL_PATTERN.DELETE,
        id,
      ),
    );
  }
}
