import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { AppLogger } from '../../common/logger/app.logger';
import { ShipmentProperties } from '../../common/properties/shipment.properties';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';
import { QuotationProperties } from 'apps/vendor-service/src/common/properties/quotation.properties';
import {Shipment_status} from '../constant/enum';
import { CreateShipmentDto } from './dto/create-shipment.dto';


@Injectable()
export class ShipmentService {
  private readonly logger = new AppLogger(ShipmentService.name);
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createShipmentDto: CreateShipmentDto) {
      const asn =
        await this.prisma.tbl_shipment.create({
          data: {
            fk_po_number:
              createShipmentDto.poNumber,
  
            fk_vendor_id:
              createShipmentDto.vendorId,
  
            asn_id:
              createShipmentDto.asnNumber,
            
              dispatch_date:
              createShipmentDto.dispatchDate,

              delivery_date:
              createShipmentDto.deliveryDate,

              logistics_provider:
              createShipmentDto.logistics_provider,

              fk_tracking_no:
              createShipmentDto.tracking_no,

              quantity:
              createShipmentDto.quantity,

              status:
              createShipmentDto.status,

              notes:
              createShipmentDto.notes,
          },
        });
  
      return ResponseHelper.success(
        asn,
        'ASN created successfully',
      );
    }

  async findAll(payload: {
    limit?: number;
    page?: number;
    search?: string;
    status?: string;
    carrier?: string;
  }) {
    try {
      this.logger.log(ShipmentProperties.service.findAll.start);
      let page =
        !isNaN(Number(payload?.page)) && Number(payload?.page) > 0
          ? Number(payload.page)
          : 1;

      const limit =
        !isNaN(Number(payload?.limit)) && Number(payload?.limit) > 0
          ? Number(payload.limit)
          : 10;

      const offset = (page - 1) * limit;
      const whereClause: any = {};

      if (payload.search) {
        whereClause.OR = [
          {
            po_no: {
              contains: payload.search,
              mode: 'insensitive',
            },
          },
          {
            asn_id: {
              contains: payload.search,
              mode: 'insensitive',
            },
          },
          {
            id: {
              contains: payload.search,
              mode: 'insensitive',
            },
          },
        ];
      }

      if (payload.status) {
        const statusKey = payload.status.toUpperCase() as keyof typeof Shipment_status;

        const statusValue = Shipment_status[statusKey];

        if (!statusValue) {
          throw new Error('Invalid shipment status');
        }

        whereClause.status = statusValue;
      }

      if (payload.carrier) {
        whereClause.carrier = {
          contains: payload.carrier,
          mode: 'insensitive',
        };
      }

      const shipments = await this.prisma.tbl_shipment.findMany({
        where: whereClause,
        skip: offset,
        take: limit,
      });
      if (!shipments) {
        throw new NotFoundException(
          'No shipments found',
        );
      }
      this.logger.log(ShipmentProperties.service.findAll.success);
      return ResponseHelper.success(
        shipments,
        'Shipments fetched successfully',
      );
    } catch (error) {
      this.logger.error(
        ShipmentProperties.service.findAll.error,
        error.stack,
      );
      return ResponseHelper.error(
        'Failed to fetch shipments',
        error.message,
      );
    }
  }

  async findOne(shipment_id: string) {
    try {
      this.logger.log(`${ShipmentProperties.service.findOne.start}: ${shipment_id}`);
      const shipment =
        await this.prisma.tbl_shipment.findUnique({
          where: { pk_shipment_id: shipment_id },
          include: {
            tracking: true,
          },
        });

      if (!shipment) {
        throw new NotFoundException(
          'Shipment not found',
        );
      }
      this.logger.log(`${ShipmentProperties.service.findOne.success}: ${shipment_id}`);
      return ResponseHelper.success(
        shipment,
        'Shipment fetched successfully',
      );
    } catch (error) {
      this.logger.error(
        `${ShipmentProperties.service.findOne.error}: ${shipment_id}`,
        error.stack,
      );
      throw error;
    }
  }
}