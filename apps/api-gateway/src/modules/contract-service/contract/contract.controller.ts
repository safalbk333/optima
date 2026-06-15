import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { ContractGatewayService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

import {
  JwtAuthGuard,
  PermissionsGuard,
  Permissions,
  HOME_READ,

} from '../../guards';

@ApiTags('Contracts-Service')
@Controller('contract')
export class ContractController {
  constructor(
    private readonly contractService: ContractGatewayService,
  ) { }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(
    HOME_READ,
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all contracts',
  })
  @ApiResponse({
    status: 200,
    description:
      'Contract list fetched successfully',
  })
  findAll() {
    return this.contractService.findAll();
  }

  @Post('by-vendor')
  @ApiOperation({ summary: 'Get contracts by vendor id' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { vendorId: { type: 'string' } },
      required: ['vendorId'],
    },
  })
  @ApiResponse({
    status: 200,
    description:
      'Contracts fetched successfully',
  })
  findByVendorId(@Body('vendorId') vendorId: string) {
    return this.contractService.findByVendorId(vendorId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a contract by ID',
  })
  @ApiResponse({
    status: 200,
    description:
      'Contract fetched successfully',
  })
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new contract',
  })
  @ApiResponse({
    status: 201,
    description:
      'Contract created successfully',
  })
  create(@Body() data: CreateContractDto) {
    return this.contractService.create(data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a contract',
  })
  @ApiResponse({
    status: 200,
    description:
      'Contract updated successfully',
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdateContractDto,
  ) {
    return this.contractService.update(
      id,
      data,
    );
  }
}
