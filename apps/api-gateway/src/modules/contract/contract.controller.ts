import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ContractGatewayService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { JwtAuthGuard, PermissionsGuard } from '../guards';

@ApiTags('Contracts-Service')
@Controller('contract')
export class ContractController {
  constructor(
    private readonly contractService: ContractGatewayService,
  ) {}

  @Get()
    @UseGuards(JwtAuthGuard ,PermissionsGuard)

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
