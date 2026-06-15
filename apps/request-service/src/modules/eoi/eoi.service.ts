import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from 'libs/database/prisma-service';

import { CreateEoiDto } from './dto/create-eoi.dto';
import { UpdateEoiDto } from './dto/update-eoi.dto';
import { UpdateEoiStatusDto } from './dto/update-eoi-status.dto';

import { EoiStatus } from './enum/eoi-status.enum';

import { AppLogger } from '../../common/logger/app.logger';
import { EoiProperties } from '../../common/properties/eoi.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';

@Injectable()
export class EoiService {
  private readonly logger = new AppLogger(
    EoiService.name,
  );

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  // =========================================================
  // FIND ALL
  // =========================================================

  async findAll() {
    this.logger.log(
      EoiProperties.service.findAll,
    );

    const eoi = await this.prisma.tbl_expression_of_interest.findMany({
      where: {
        document_status: {
          not: 'D',
        },
      },

      include: {
        request: true,
        vendor: true,
      },

      orderBy: {
        created: 'desc',
      },
    });

    return ResponseHelper.success(
      eoi,
      "Expression of Interest fetched successfully",
    );
  }

  // =========================================================
  // FIND ONE
  // =========================================================

  async findOne(
    eoiId: string,
  ) {
    this.logger.log(
      `${EoiProperties.service.findOne}: ${eoiId}`,
    );

    const eoi =
      await this.prisma.tbl_expression_of_interest.findFirst({
        where: {
          pk_eoi_id: eoiId,

          document_status: {
            not: 'D',
          },
        },

        include: {
          request: {
            include: {
              pr_item_mappings: {
                include: {
                  item: true,
                },
              },
            },
          },
          vendor: true,
          rfqs: true,
        },
      });

    if (!eoi) {
      throw new NotFoundException(
        'EOI not found',
      );
    }

    return ResponseHelper.success(
      eoi,
      "Expression of Interest fetched successfully",
    );
  }
  // =========================================================
  // GET EOI BY VENDOR ID
  // =========================================================

  async findByVendorId(
    vendorId: string,
  ) {
    const vendor =
      await this.prisma.tbl_vendor.findUnique({
        where: {
          pk_vendor_id: vendorId,
        },
      });

    if (!vendor) {
      throw new NotFoundException(
        'Vendor not found',
      );
    }

    const vendor_eoi = await this.prisma.tbl_expression_of_interest.findMany({
      where: {
        fk_vendor_id: vendorId,
        document_status: {
          not: 'D',
        },
      },

      include: {
        request: {
          select: {
            pk_request_id: true,
            request_number: true,
            title: true,
            currency: true,
            estimated_value: true,
          },
        },

        vendor: {
          select: {
            pk_vendor_id: true,
            vendor_name: true,
            vendor_email: true,
          },
        },
      },

      orderBy: {
        created: 'desc',
      },
    });
    return ResponseHelper.success(
      vendor_eoi,
      "Expression of Interest of vendor fetched successfully",
    );
  }
  // =========================================================
  // CREATE
  // =========================================================

  async create(
    dto: CreateEoiDto,
  ) {
    this.logger.log(
      EoiProperties.service.create,
    );

    await this.validateRequestAndVendor(
      dto.fk_request_id,
      dto.fk_vendor_id,
    );

    const existingEoi =
      await this.prisma.tbl_expression_of_interest.findFirst({
        where: {
          fk_request_id:
            dto.fk_request_id,

          fk_vendor_id:
            dto.fk_vendor_id,

          document_status: {
            not: 'D',
          },
        },
      });

    if (existingEoi) {
      throw new BadRequestException(
        'EOI already exists for this vendor and request',
      );
    }

    const eoiCode = `EOI-${Date.now()}`;

    const eoi = await this.prisma.tbl_expression_of_interest.create({
      data: {
        eoi_code: eoiCode,

        eoi_title:
          dto.eoi_title,

        fk_request_id:
          dto.fk_request_id,

        fk_vendor_id:
          dto.fk_vendor_id,

        notes:
          dto.notes,

        submission_deadline:
          new Date(
            dto.submission_deadline,
          ),

        status:
          EoiStatus.DRAFT,
      },
    });
    return ResponseHelper.success(
      eoi,
      "Expression of Interest of vendor created successfully",
    );
  }

  // =========================================================
  // UPDATE
  // =========================================================

  async update(
    eoiId: string,
    dto: UpdateEoiDto,
  ) {
    this.logger.log(
      `${EoiProperties.service.update}: ${eoiId}`,
    );

    const eoi =
      await this.findOne(eoiId);

    if (
      eoi.data.status ===
      EoiStatus.ACCEPTED
    ) {
      throw new BadRequestException(
        'Accepted EOI cannot be updated',
      );
    }

    const eoi_data = await this.prisma.tbl_expression_of_interest.update({
      where: {
        pk_eoi_id: eoiId,
      },

      data: {
        eoi_title:
          dto.eoi_title,

        notes:
          dto.notes,

        submission_deadline:
          dto.submission_deadline
            ? new Date(
              dto.submission_deadline,
            )
            : undefined,

        modified:
          new Date(),
      },
    });
    return ResponseHelper.success(
      eoi_data,
      "Expression of Interest of vendor updated successfully",
    );
  }

  // =========================================================
  // CHANGE STATUS
  // =========================================================

  async changeStatus(
    eoiId: string,
    dto: UpdateEoiStatusDto,
  ) {
    this.logger.log(
      `${EoiProperties.service.changeStatus}: ${eoiId}`,
    );

    const eoi =
      await this.findOne(eoiId);

    if (
      eoi.data.status ===
      EoiStatus.ACCEPTED &&
      dto.status !==
      EoiStatus.ACCEPTED
    ) {
      throw new BadRequestException(
        'Accepted EOI status cannot be changed',
      );
    }

    return this.prisma.tbl_expression_of_interest.update({
      where: {
        pk_eoi_id: eoiId,
      },

      data: {
        status:
          dto.status,

        notes:
          dto.notes,

        submitted_at:
          dto.status ===
            EoiStatus.ACCEPTED
            ? new Date()
            : eoi.data.submitted_at,

        modified:
          new Date(),
      },
    });
  }

  // =========================================================
  // DELETE
  // =========================================================

  async delete(
    eoiId: string,
  ) {
    this.logger.log(
      `${EoiProperties.service.delete}: ${eoiId}`,
    );

    await this.findOne(eoiId);

    return this.prisma.tbl_expression_of_interest.update({
      where: {
        pk_eoi_id: eoiId,
      },

      data: {
        document_status: 'D',

        modified:
          new Date(),
      },
    });
  }

  // =========================================================
  // PRIVATE METHODS
  // =========================================================

  private async validateRequestAndVendor(
    requestId: string,
    vendorId: string,
  ) {
    const request =
      await this.prisma.tbl_purchase_request.findUnique({
        where: {
          pk_request_id:
            requestId,
        },
      });

    if (!request) {
      throw new NotFoundException(
        'Purchase request not found',
      );
    }

    const vendor =
      await this.prisma.tbl_vendor.findUnique({
        where: {
          pk_vendor_id:
            vendorId,
        },
      });

    if (!vendor) {
      throw new NotFoundException(
        'Vendor not found',
      );
    }
  }
}