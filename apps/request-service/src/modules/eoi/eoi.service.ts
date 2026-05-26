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

@Injectable()
export class EoiService {
  private readonly logger = new AppLogger(
    EoiService.name,
  );

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =========================================================
  // FIND ALL
  // =========================================================

  async findAll() {
    this.logger.log(
      EoiProperties.service.findAll,
    );

    return this.prisma.tbl_expression_of_interest.findMany({
      where: {
        chr_document_status: {
          not: 'D',
        },
      },

      include: {
        request: true,
        vendor: true,
      },

      orderBy: {
        tim_created: 'desc',
      },
    });
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
          pk_chr_eoi_id: eoiId,

          chr_document_status: {
            not: 'D',
          },
        },

        include: {
          request: true,
          vendor: true,
          rfqs: true,
        },
      });

    if (!eoi) {
      throw new NotFoundException(
        'EOI not found',
      );
    }

    return eoi;
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
        pk_chr_vendor_id: vendorId,
      },
    });

  if (!vendor) {
    throw new NotFoundException(
      'Vendor not found',
    );
  }

  return this.prisma.tbl_expression_of_interest.findMany({
    where: {
      fk_chr_vendor_id: vendorId,
      chr_document_status: {
        not: 'D',
      },
    },

    include: {
      request: {
        select: {
          pk_chr_request_id: true,
          chr_request_number: true,
          chr_title: true,
          chr_currency: true,
          flt_estimated_value: true,
        },
      },

      vendor: {
        select: {
          pk_chr_vendor_id: true,
          chr_vendor_name: true,
          chr_vendor_email: true,
        },
      },
    },

    orderBy: {
      tim_created: 'desc',
    },
  });
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
      dto.fk_chr_request_id,
      dto.fk_chr_vendor_id,
    );

    const existingEoi =
      await this.prisma.tbl_expression_of_interest.findFirst({
        where: {
          fk_chr_request_id:
            dto.fk_chr_request_id,

          fk_chr_vendor_id:
            dto.fk_chr_vendor_id,

          chr_document_status: {
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

    return this.prisma.tbl_expression_of_interest.create({
      data: {
        chr_eoi_code: eoiCode,

        chr_eoi_title:
          dto.chr_eoi_title,

        fk_chr_request_id:
          dto.fk_chr_request_id,

        fk_chr_vendor_id:
          dto.fk_chr_vendor_id,

        txt_notes:
          dto.txt_notes,

        dt_submission_deadline:
          new Date(
            dto.dt_submission_deadline,
          ),

        chr_status:
          EoiStatus.DRAFT,
      },
    });
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
      eoi.chr_status ===
      EoiStatus.ACCEPTED
    ) {
      throw new BadRequestException(
        'Accepted EOI cannot be updated',
      );
    }

    return this.prisma.tbl_expression_of_interest.update({
      where: {
        pk_chr_eoi_id: eoiId,
      },

      data: {
        chr_eoi_title:
          dto.chr_eoi_title,

        txt_notes:
          dto.txt_notes,

        dt_submission_deadline:
          dto.dt_submission_deadline
            ? new Date(
                dto.dt_submission_deadline,
              )
            : undefined,

        tim_modified:
          new Date(),
      },
    });
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
      eoi.chr_status ===
        EoiStatus.ACCEPTED &&
      dto.chr_status !==
        EoiStatus.ACCEPTED
    ) {
      throw new BadRequestException(
        'Accepted EOI status cannot be changed',
      );
    }

    return this.prisma.tbl_expression_of_interest.update({
      where: {
        pk_chr_eoi_id: eoiId,
      },

      data: {
        chr_status:
          dto.chr_status,

        txt_notes:
          dto.txt_notes,

        dt_submitted_at:
          dto.chr_status ===
          EoiStatus.ACCEPTED
            ? new Date()
            : eoi.dt_submitted_at,

        tim_modified:
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
        pk_chr_eoi_id: eoiId,
      },

      data: {
        chr_document_status: 'D',

        tim_modified:
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
          pk_chr_request_id:
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
          pk_chr_vendor_id:
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