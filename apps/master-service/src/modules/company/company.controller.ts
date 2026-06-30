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
  create(@Payload() dto: CreateCompanyDto) {
    this.logger.log(CompanyProperties.controller.create);
    return this.companyService.create(dto);
  }

  @MessagePattern('company.findAll')
  findAll(@Payload() payload: { limit?: number; page?: number; search?: string }) {
    this.logger.log(CompanyProperties.controller.findAll);
    return this.companyService.findAll(payload);
  }

  @MessagePattern('company.findOne')
  findOne(@Payload() data: { id: string }) {
    this.logger.log(`${CompanyProperties.controller.findOne}: ${data.id}`);
    return this.companyService.findOne(data.id);
  }

  @MessagePattern('company.update')
  update(@Payload() payload: { id: string; data: UpdateCompanyDto }) {
    this.logger.log(`${CompanyProperties.controller.update}: ${payload.id}`);
    return this.companyService.update(payload.id, payload.data);
  }
}
