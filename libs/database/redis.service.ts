import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    super({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      lazyConnect: true,
      retryStrategy: (times: number) => {
        // Retry up to 5 times with exponential backoff (max 5s)
        if (times > 5) {
          this.logger.error('Redis: max retry attempts reached, giving up.');
          return null;
        }
        const delay = Math.min(times * 500, 5000);
        this.logger.warn(`Redis: retrying connection in ${delay}ms (attempt ${times})...`);
        return delay;
      },
    });

    this.on('connect', () => this.logger.log('Redis connected successfully.'));
    this.on('ready', () => this.logger.log('Redis is ready to accept commands.'));
    this.on('error', (err) => this.logger.error(`Redis error: ${err.message}`));
    this.on('close', () => this.logger.warn('Redis Disconnected..'));
    this.on('reconnecting', () => this.logger.warn('Redis reconnecting...'));
  }

  async onModuleInit(): Promise<void> {
    await this.connect();
    this.logger.log('RedisService initialized.');
  }

  async onModuleDestroy(): Promise<void> {
    await this.quit();
    this.logger.log('RedisService disconnected.');
  }
}
