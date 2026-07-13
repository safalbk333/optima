import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from './redis.service';

/**
 * CacheService — Generic Cache-Aside pattern helper.
 *
 * Keys do NOT expire automatically. They are only removed when
 * explicitly invalidated via `del()` or `update()` after a mutation.
 *
 * Usage:
 *   // Read-through with DB fallback
 *   const data = await this.cache.getOrSet(
 *     'currency:all',
 *     () => this.prisma.tbl_currency.findMany(),
 *   );
 *
 *   // Invalidate after mutation
 *   await this.cache.del('currency:all');
 */
@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(private readonly redis: RedisService) {}

  // ─── Helpers ──────────────────────────────────────────────────────────────

  /** Returns true when the Redis connection is usable. */
  private get isRedisReady(): boolean {
    return this.redis.status === 'ready';
  }

  // ─── Core Operations ──────────────────────────────────────────────────────

  /**
   * Set a value in Redis cache with no expiry.
   * The key persists until explicitly deleted via `del()`.
   *
   * @param key   Redis key
   * @param value Any JSON-serialisable value
   */
  async set(key: string, value: unknown): Promise<void> {
    if (!this.isRedisReady) {
      this.logger.warn(`[Cache SET skipped] Redis not ready — key: ${key}`);
      return;
    }
    try {
      await this.redis.set(key, JSON.stringify(value));
      this.logger.debug(`[Cache SET] key=${key} (no expiry)`);
    } catch (err) {
      this.logger.error(`[Cache SET error] key=${key} — ${err.message}`);
    }
  }

  /**
   * Get a value from Redis cache.
   * Returns `null` when not found or Redis is unavailable.
   */
  async get<T>(key: string): Promise<T | null> {
    if (!this.isRedisReady) {
      this.logger.warn(`[Cache GET skipped] Redis not ready — key: ${key}`);
      return null;
    }
    try {
      const strRaw = await this.redis.get(key);
      if (strRaw === null) {
        this.logger.debug(`[Cache MISS] key=${key}`);
        return null;
      }
      this.logger.debug(`[Cache HIT] key=${key}`);
      return JSON.parse(strRaw) as T;
    } catch (err) {
      this.logger.error(`[Cache GET error] key=${key} — ${err.message}`);
      return null;
    }
  }

  /**
   * Delete one or more keys from Redis cache.
   * Call this after any create / update / delete mutation.
   */
  async del(...keys: string[]): Promise<void> {
    if (!this.isRedisReady) {
      this.logger.warn(`[Cache DEL skipped] Redis not ready — keys: ${keys.join(', ')}`);
      return;
    }
    try {
      await this.redis.del(...keys);
      this.logger.debug(`[Cache DEL] keys=${keys.join(', ')}`);
    } catch (err) {
      this.logger.error(`[Cache DEL error] keys=${keys.join(', ')} — ${err.message}`);
    }
  }

  /**
   * Cache-Aside (Read-Through) pattern.
   *
   * 1. Try to return data from Redis.
   * 2. On cache miss (or Redis down), invoke `dbFallback()` to fetch from DB.
   * 3. Store the DB result in Redis with no expiry (persists until invalidated).
   * 4. If Redis is down, transparently serve directly from DB without throwing.
   *
   * @param key        Redis cache key
   * @param dbFallback Async callback that fetches data from the database
   */
  async getOrSet<T>(
    key: string,
    dbFallback: () => Promise<T>,
  ): Promise<T> {
    // 1️⃣ Attempt cache read
    const objCached = await this.get<T>(key);
    if (objCached !== null) {
      return objCached;
    }

    // 2️⃣ Cache miss — fetch from DB
    this.logger.debug(`[Cache-Aside] Fetching from DB for key=${key}`);
    const objData = await dbFallback();

    // 3️⃣ Populate cache (fire-and-forget; never blocks the response)
    this.set(key, objData).catch((error) => {
      console.log(error)
    });

    return objData;
  }

  /**
   * Update cache with a new value and invalidate related list/sibling keys.
   * Keys are stored with no expiry — only removed by explicit invalidation.
   *
   * @param key             Redis key to update with the new value
   * @param value           New value to store
   * @param invalidateKeys  Additional keys to delete (e.g. the list cache after an item update)
   */
  async update(
    key: string,
    value: unknown,
    ...invalidateKeys: string[]
  ): Promise<void> {
    await this.set(key, value);
    if (invalidateKeys.length > 0) {
      await this.del(...invalidateKeys);
    }
  }
}
