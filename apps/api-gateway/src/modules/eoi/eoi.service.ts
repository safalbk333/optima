import {
    Inject,
    Injectable,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';
import { CreateEoiDto } from './dto/create-eoi.dto';
import { UpdateEoiDto } from './dto/update-eoi.dto';
import { UpdateEoiStatusDto } from './dto/update-eoi-status.dto';
import { EOI_PATTERN } from './eoi.pattern';

@Injectable()
export class EoiGatewayService {
    constructor(
        @Inject('REQUEST_SERVICE')
        private readonly client: ClientProxy,
    ) { }

    async findAll() {
        return await firstValueFrom(
            this.client.send(EOI_PATTERN.FIND_ALL, {}),
        );
    }

    async findOne(id: string) {
        return await firstValueFrom(
            this.client.send(EOI_PATTERN.FIND_ONE, id),
        );
    }
    async findByVendorId(
        vendorId: string,
    ) {
        return await firstValueFrom(
            this.client.send(
                EOI_PATTERN.FIND_BY_VENDOR_ID,
                vendorId,
            ),
        );
    }

    async create(data: CreateEoiDto) {
        return await firstValueFrom(
            this.client.send(EOI_PATTERN.CREATE, data),
        );
    }

    async update(id: string, data: UpdateEoiDto) {
        return await firstValueFrom(
            this.client.send(EOI_PATTERN.UPDATE, { id, data }),
        );
    }

    async updateStatus(id: string, data: UpdateEoiStatusDto) {
        return await firstValueFrom(
            this.client.send(EOI_PATTERN.UPDATE_STATUS, { id, data }),
        );
    }
}
