import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma-service';
import { CacheService } from 'libs/database/cache.service';
import { CreateStateDto, UpdateStateDto } from './dto/state.dto';
import { AppLogger } from '../../common/logger/app.logger';
import { ResponseHelper } from 'libs/common/utils/helper/response.helper';
import { StateProperties } from '../../common/properties/state.properties';

const CACHE_KEYS = {
  all: (strSchemaId: string) => `${strSchemaId}:state:all`,
  one: (strSchemaId: string, strId: string) => `${strSchemaId}:state:${strId}`,
};

@Injectable()
export class StateService {
  private readonly logger = new AppLogger(StateService.name);
  private objSchemaClient: any;

  constructor(
    private readonly prisma: PrismaService,
    // private readonly cache: CacheService,
  ) { }

  private async getSchemaClient() {
    if (!this.objSchemaClient) {
      this.objSchemaClient = await this.prisma.getClient('public');
    }
    return this.objSchemaClient;
  }

  async create(strSchemaId: string, dto: CreateStateDto) {
    try {
      this.logger.log(StateProperties.service.create.start);
      const objPrisma = await this.getSchemaClient();

      const objState = await objPrisma.tbl_state.create({
        data: {
          state_name: dto.stateName,
          fk_country_id: dto.countryId,
        },
        include: { country: true },
      });

      this.logger.log(`${StateProperties.service.create.success}: ${objState.pk_state_id}`);
      // await this.cache.del(CACHE_KEYS.all(strSchemaId));
      return ResponseHelper.success(objState, 'State created successfully');
    } catch (error) {
      this.logger.error(StateProperties.service.create.error, error.stack);
      return ResponseHelper.error('Failed to create state', error.message);
    }
  }

  async findAll(strSchemaId: string, payload: { limit?: number; page?: number; search?: string; countryId?: string }) {
    try {
      this.logger.log(StateProperties.service.findAll.start);

      const page = !isNaN(Number(payload?.page)) && Number(payload?.page) > 0 ? Number(payload.page) : 1;
      const limit = !isNaN(Number(payload?.limit)) && Number(payload?.limit) > 0 ? Number(payload.limit) : 10;

      const whereClause: any = { is_active: true, is_delete: false };
      if (payload?.countryId) whereClause.fk_country_id = payload.countryId;
      if (payload?.search) whereClause.state_name = { contains: payload.search, mode: 'insensitive' };

      const objPrisma = await this.getSchemaClient();

      const arrStates = await objPrisma.tbl_state.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          state_name: 'asc',
        },
        include: {
          country: true,
        },
      });

      // const objPrisma = await this.getSchemaClient();
      const total = await objPrisma.tbl_state.count({ where: whereClause });

      this.logger.log(StateProperties.service.findAll.success);
      return ResponseHelper.success(
        { states: arrStates, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } },
        'States fetched successfully',
      );
    } catch (error) {
      this.logger.error(StateProperties.service.findAll.error, error.stack);
      return ResponseHelper.error('Failed to fetch states', error.message);
    }
  }

  async findOne(strSchemaId: string, strId: string) {
    try {
      this.logger.log(`${StateProperties.service.findOne.start}: ${strId}`);

      const objPrisma = await this.getSchemaClient();

      const objState = await objPrisma.tbl_state.findUnique({
        where: {
          pk_state_id: strId,
          is_active: true,
          is_delete: false,
        },
        include: {
          country: true,
        },
      });

      if (!objState) throw new NotFoundException('State not found');

      this.logger.log(`${StateProperties.service.findOne.success}: ${strId}`);
      return ResponseHelper.success(objState, 'State fetched successfully');
    } catch (error) {
      this.logger.error(`${StateProperties.service.findOne.error}: ${strId}`, error.stack);
      throw error;
    }
  }

  async update(strSchemaId: string, strId: string, dto: UpdateStateDto) {
    try {
      this.logger.log(`${StateProperties.service.update.start}: ${strId}`);
      const objPrisma = await this.getSchemaClient();

      const objExisting = await objPrisma.tbl_state.findFirst({
        where: {
          pk_state_id: strId,
          is_active: true,
          is_delete: false,
        },
      });

      if (!objExisting) {
        throw new BadRequestException('State not found');
      }

      const objUpdatedState = await objPrisma.tbl_state.update({
        where: { pk_state_id: strId },
        data: {
          state_name: dto.stateName,
          fk_country_id: dto.countryId,
          is_active: dto.isActive,
          modified: new Date(),
        },
        include: {
          country: true,
        },
      });

      this.logger.log(`${StateProperties.service.update.success}: ${strId}`);

      return ResponseHelper.success(
        objUpdatedState,
        'State updated successfully',
      );
    } catch (error) {
      this.logger.error(
        `${StateProperties.service.update.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }
}
