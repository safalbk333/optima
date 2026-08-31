import { Controller, Param } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { VendorService } from './vendor.service';
import { CreateVendorAddressDto, CreateVendorBankAccountDto, CreateVendorContactDto, CreateVendorDto, CreateVendorTaxDto, UpdateVendorDto } from './dto/create-vendor.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { VendorProperties } from '../../common/properties/vendor.properties';

@Controller()
export class VendorController {
  private readonly logger = new AppLogger(VendorController.name);

  constructor(
    private readonly vendorService: VendorService,
  ) {
    this.logger.log(VendorProperties.controller.start);
  }

  @MessagePattern('vendor.findAll')
  findAll(
    @Payload() payload: {
      limit?: number;
      page?: number;
      search?: string;
    }
  ) {
    this.logger.log(VendorProperties.controller.findAll);
    return this.vendorService.findAll(payload);
  }

  @MessagePattern('vendor.findOne')
  findOne(@Payload() data: { id: string }) {
    this.logger.log(`${VendorProperties.controller.findOne}: ${data.id}`);
    return this.vendorService.findOne(data.id);
  }

  // @MessagePattern('vendor.create')
  // create(@Payload() createVendorDto: CreateVendorDto) {
  //   this.logger.log(VendorProperties.controller.create);
  //   return this.vendorService.create(createVendorDto); 
  // }

  @MessagePattern('vendor.update')
  update(@Payload()
  payload: {
    id: string;
    data: UpdateVendorDto;
  },
  ) {
    this.logger.log(`${VendorProperties.controller.update}: ${payload.id}`,);
    return this.vendorService.update(
      payload.id,
      payload.data,
    );
  }

  @MessagePattern('vendor.upload')
  async bulkUpload(
    @Payload() payload: any,
  ) {
    return this.vendorService.bulkUpload(payload);
  }

  @MessagePattern('vendor.documentById.view')
  async viewVendorDocument(
    @Payload() data: { documentId: string },
  ) {
    return this.vendorService.viewVendorDocument(
      data.documentId,
    );
  }

  @MessagePattern('vendor.documentUpload')
  async uploadVendorDocument(payload: any) {
    return this.vendorService.uploadVendorDocument(payload);
  }

  @MessagePattern('view.vendor.document')
  async viewVendorDocumentByVendorId() {
    const result =
      await this.vendorService.viewVendorDocumentByVendorId();

    return result;
  }

  @MessagePattern('vendor.createVendor')
  createVendor(@Payload() createVendorDto: CreateVendorDto) {
    this.logger.log(VendorProperties.controller.create);
    return this.vendorService.createVendor(createVendorDto);
  }

  @MessagePattern('vendor.saveVendorAddress')
  saveVendorAddress(@Payload() data: CreateVendorAddressDto) {
    this.logger.log(VendorProperties.controller.create);
    return this.vendorService.saveVendorAddress(data);
  }

  @MessagePattern('vendor.createContact')
  async createVendorContact(
    @Payload() createVendorContactDto: CreateVendorContactDto,
  ) {
    return this.vendorService.createVendorContact(
      createVendorContactDto,
    );
  }

  @MessagePattern('vendor.createTaxRegistration')
  createTaxRegistration(
    @Payload() data: CreateVendorTaxDto) {
    this.logger.log(VendorProperties.controller.create);
    return this.vendorService.createTaxRegistration(data);
  }

  @MessagePattern('vendor.createBankAccount')
  createBankAccount(
    @Payload() data: CreateVendorBankAccountDto) {
    this.logger.log(VendorProperties.controller.create);
    return this.vendorService.createBankAccount(data);
  }

  @MessagePattern('vendor.submitVendor')
  submitVendor(
    @Payload() data: { vendorId: string },) {
    this.logger.log(VendorProperties.controller.create);
    return this.vendorService.submitVendor(data.vendorId);
  }
}