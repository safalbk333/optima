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
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiBody,
} from '@nestjs/swagger';

import { EoiGatewayService } from './eoi.service';
import { CreateEoiDto } from './dto/create-eoi.dto';
import { UpdateEoiDto } from './dto/update-eoi.dto';
import { UpdateEoiStatusDto } from './dto/update-eoi-status.dto';

import {
    JwtAuthGuard,
    PermissionsGuard,
    Permissions,
    HOME_READ,

} from '../guards';

@ApiTags('EOIs-Service')
@Controller('eoi')
export class EoiController {
    constructor(
        private readonly eoiService: EoiGatewayService,
    ) { }

    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all EOIs' })
    @ApiResponse({ status: 200, description: 'EOI list fetched successfully' })
    findAll() {
        return this.eoiService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an EOI by ID' })
    @ApiResponse({ status: 200, description: 'EOI fetched successfully' })
    findOne(@Param('id') id: string) {
        return this.eoiService.findOne(id);
    }

    @Get('/vendor/:vendorId')
    @ApiOperation({
        summary: 'Get EOIs by vendor id',
    })
    @ApiResponse({
        status: 200,
        description:
            'Vendor EOIs fetched successfully',
    })
    findByVendorId(
        @Param('vendorId')
        vendorId: string,
    ) {
        return this.eoiService.findByVendorId(
            vendorId,
        );
    }
    @Post()
    @ApiOperation({ summary: 'Create a new EOI' })
    @ApiBody({
        description: 'EOI creation payload',
        type: CreateEoiDto,
        examples: {
            example1: {
                value: {
                    chr_eoi_title: 'EOI for Office Supplies',
                    fk_chr_request_id: '123e4567-e89b-12d3-a456-426614174000',
                    fk_chr_vendor_id: '123e4567-e89b-12d3-a456-426614174001',
                    txt_notes: 'Please include shipping cost in your quote',
                    dt_submission_deadline: '2026-06-30T23:59:59Z',
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'EOI created successfully' })
    create(@Body() data: CreateEoiDto) {
        return this.eoiService.create(data);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an EOI' })
    @ApiBody({
        description: 'EOI update payload',
        type: UpdateEoiDto,
        examples: {
            example1: {
                value: {
                    chr_eoi_title: 'EOI for Office Supplies - Updated',
                    txt_notes: 'Updated notes with new requirements',
                    dt_submission_deadline: '2026-07-15T23:59:59Z',
                },
            },
            example2: {
                value: {
                    chr_eoi_title: 'Updated Title Only',
                },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'EOI updated successfully' })
    update(@Param('id') id: string, @Body() data: UpdateEoiDto) {
        return this.eoiService.update(id, data);
    }

    @Put(':id/status')
    @ApiOperation({ summary: 'Update an EOI status' })
    @ApiBody({
        description: 'EOI status update payload',
        type: UpdateEoiStatusDto,
        examples: {
            example1: {
                value: {
                    chr_status: 'SENT',
                    txt_notes: 'Sent to vendor on 2026-05-26',
                },
            },
            example2: {
                value: {
                    chr_status: 'ACCEPTED',
                    txt_notes: 'Vendor has accepted the EOI',
                },
            },
            example3: {
                value: {
                    chr_status: 'REJECTED',
                    txt_notes: 'Vendor rejected the quote',
                },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'EOI status updated successfully' })
    updateStatus(@Param('id') id: string, @Body() data: UpdateEoiStatusDto) {
        return this.eoiService.updateStatus(id, data);
    }
}
