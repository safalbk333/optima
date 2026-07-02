import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateRateCardDto } from './dto/create-rate-card.dto';
import { UpdateRateCardDto } from './dto/update-rate-card.dto';
import { CloneRateCardDto } from './dto/clone-rate-card.dto';
import { RateCardQueryDto } from './dto/rate-card-query.dto';
import { CreateRateCardItemDto } from './dto/create-rate-card-item.dto';
import { UpdateRateCardItemDto } from './dto/update-rate-card-item.dto';
import { CreateFixedPriceDto } from './dto/create-fixed-price.dto';
import { UpdateFixedPriceDto } from './dto/update-fixed-price.dto';
import { CreateTierPriceDto } from './dto/create-tier-price.dto';
import { UpdateTierPriceDto } from './dto/update-tier-price.dto';
import { CreateMilestonePriceDto } from './dto/create-milestone-price.dto';
import { UpdateMilestonePriceDto } from './dto/update-milestone-price.dto';
import { CalculatePriceDto } from './dto/calculate-price.dto';

@Injectable()
export class RateCardGatewayService {
  private readonly logger: Logger;

  constructor(
    @Inject('RATE_CARD_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.logger = new Logger(RateCardGatewayService.name);
  }

  // ─── Rate Card ─────────────────────────────────────────────────────────────

  async create(dto: CreateRateCardDto, userId: string) {
    try {
      return await firstValueFrom(
        this.client.send('rate-card.create', { dto, userId }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findAll(query: RateCardQueryDto) {
    try {
      return await firstValueFrom(
        this.client.send('rate-card.findAll', query),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await firstValueFrom(
        this.client.send('rate-card.findOne', { id }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async update(id: string, dto: UpdateRateCardDto, userId: string) {
    try {
      return await firstValueFrom(
        this.client.send('rate-card.update', { id, dto, userId }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async remove(id: string, userId: string) {
    try {
      return await firstValueFrom(
        this.client.send('rate-card.remove', { id, userId }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async activate(id: string, userId: string) {
    try {
      return await firstValueFrom(
        this.client.send('rate-card.activate', { id, userId }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async deactivate(id: string, userId: string) {
    try {
      return await firstValueFrom(
        this.client.send('rate-card.deactivate', { id, userId }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async clone(id: string, dto: CloneRateCardDto, userId: string) {
    try {
      return await firstValueFrom(
        this.client.send('rate-card.clone', { id, dto, userId }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async getActive() {
    try {
      return await firstValueFrom(
        this.client.send('rate-card.getActive', {}),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async getExpired() {
    try {
      return await firstValueFrom(
        this.client.send('rate-card.getExpired', {}),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async getExpiring(days: number) {
    try {
      return await firstValueFrom(
        this.client.send('rate-card.getExpiring', { days }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  // ─── Rate Card Items ────────────────────────────────────────────────────────

  async addItem(rateCardId: string, dto: CreateRateCardItemDto, userId: string) {
    try {
      return await firstValueFrom(
        this.client.send('rate-card-item.add', { rateCardId, dto, userId }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async listItems(rateCardId: string) {
    try {
      return await firstValueFrom(
        this.client.send('rate-card-item.list', { rateCardId }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async updateItem(
    rateCardId: string,
    itemId: string,
    dto: UpdateRateCardItemDto,
    userId: string,
  ) {
    try {
      return await firstValueFrom(
        this.client.send('rate-card-item.update', { rateCardId, itemId, dto, userId }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async deleteItem(rateCardId: string, itemId: string) {
    try {
      return await firstValueFrom(
        this.client.send('rate-card-item.delete', { rateCardId, itemId }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  // ─── Fixed Price ────────────────────────────────────────────────────────────

  async createFixedPrice(rateCardId: string, itemId: string, dto: CreateFixedPriceDto) {
    try {
      return await firstValueFrom(
        this.client.send('fixed-price.create', { rateCardId, itemId, dto }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async updateFixedPrice(rateCardId: string, itemId: string, dto: UpdateFixedPriceDto) {
    try {
      return await firstValueFrom(
        this.client.send('fixed-price.update', { rateCardId, itemId, dto }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async deleteFixedPrice(rateCardId: string, itemId: string) {
    try {
      return await firstValueFrom(
        this.client.send('fixed-price.delete', { rateCardId, itemId }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  // ─── Tier Price ─────────────────────────────────────────────────────────────

  async createTier(rateCardId: string, itemId: string, dto: CreateTierPriceDto) {
    try {
      return await firstValueFrom(
        this.client.send('tier-price.create', { rateCardId, itemId, dto }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async updateTier(
    rateCardId: string,
    itemId: string,
    tierId: string,
    dto: UpdateTierPriceDto,
  ) {
    try {
      return await firstValueFrom(
        this.client.send('tier-price.update', { rateCardId, itemId, tierId, dto }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async deleteTier(rateCardId: string, itemId: string, tierId: string) {
    try {
      return await firstValueFrom(
        this.client.send('tier-price.delete', { rateCardId, itemId, tierId }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  // ─── Milestone Price ────────────────────────────────────────────────────────

  async createMilestone(rateCardId: string, itemId: string, dto: CreateMilestonePriceDto) {
    try {
      return await firstValueFrom(
        this.client.send('milestone-price.create', { rateCardId, itemId, dto }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async updateMilestone(
    rateCardId: string,
    itemId: string,
    milestoneId: string,
    dto: UpdateMilestonePriceDto,
  ) {
    try {
      return await firstValueFrom(
        this.client.send('milestone-price.update', { rateCardId, itemId, milestoneId, dto }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  async deleteMilestone(rateCardId: string, itemId: string, milestoneId: string) {
    try {
      return await firstValueFrom(
        this.client.send('milestone-price.delete', { rateCardId, itemId, milestoneId }),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }

  // ─── Pricing Engine ─────────────────────────────────────────────────────────

  async calculatePrice(dto: CalculatePriceDto) {
    try {
      return await firstValueFrom(
        this.client.send('pricing.calculate', dto),
      );
    } catch (error) {
      this.logger.error(error.message, error);
      throw error;
    }
  }
}