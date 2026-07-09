import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CompanyService } from './company.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { CompanyProperties } from '../../common/properties/company.properties';

@Controller()
export class CompanyController {
  private readonly logger = new AppLogger(CompanyController.name);

  constructor(private readonly companyService: CompanyService) {
    this.logger.log(CompanyProperties.controller.start);
  }

  @MessagePattern('company.create')
  create(@Payload() payload: { schemaId: string; data: CreateCompanyDto }) {
    this.logger.log(CompanyProperties.controller.create);
    return this.companyService.create(payload.schemaId, payload.data);
  }

  @MessagePattern('company.findAll')
  findAll(@Payload() payload: { schemaId: string; limit?: number; page?: number; search?: string }) {
    this.logger.log(CompanyProperties.controller.findAll);
    return this.companyService.findAll(payload.schemaId, payload);
  }

  @MessagePattern('company.findOne')
  findOne(@Payload() payload: { schemaId: string; id: string }) {
    this.logger.log(`${CompanyProperties.controller.findOne}: ${payload.id}`);
    return this.companyService.findOne(payload.schemaId, payload.id);
  }

  @MessagePattern('company.update')
  update(@Payload() payload: { schemaId: string; id: string; data: UpdateCompanyDto }) {
    this.logger.log(`${CompanyProperties.controller.update}: ${payload.id}`);
    return this.companyService.update(payload.schemaId, payload.id, payload.data);
  }
}
