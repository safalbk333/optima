import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';
import { CreateRequestForQuotationDto } from './dto/create-request-for-quotation.dto';
import { UpdateRequestForQuotationDto } from './dto/update-request-for-quotation.dto';
import { RFQ_PATTERN } from './request-for-quotation.pattern';

@Injectable()
export class RequestForQuotationGatewayService {
  constructor(
    @Inject('REQUEST_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async findAll() {
    return await firstValueFrom(
      this.client.send(
        RFQ_PATTERN.FIND_ALL,
        {},
      ),
    );
  }

  async findOne(id: string) {
    return await firstValueFrom(
      this.client.send(
        RFQ_PATTERN.FIND_ONE,
        id,
      ),
    );
  }

  async findByVendorId(vendorId: string) {
    return await firstValueFrom(
      this.client.send(RFQ_PATTERN.FIND_BY_VENDOR_ID, vendorId),
    );
  }

  async create(data: CreateRequestForQuotationDto) {
    return await firstValueFrom(
      this.client.send(
        RFQ_PATTERN.CREATE,
        data,
      ),
    );
  }

  async update(
    id: string,
    data: UpdateRequestForQuotationDto,
  ) {
    return await firstValueFrom(
      this.client.send(
        RFQ_PATTERN.UPDATE,
        { id, data },
      ),
    );
  }

  async delete(id: string) {
    return await firstValueFrom(
      this.client.send(
        RFQ_PATTERN.DELETE,
        id,
      ),
    );
  }
}
