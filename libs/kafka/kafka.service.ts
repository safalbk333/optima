import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, Consumer, Partitioners, logLevel } from 'kafkajs';
import {
  KafkaEmitOptions,
  KafkaEventEnvelope,
  KafkaMessageHandler,
} from './kafka.interfaces';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);

  private readonly kafka: Kafka;
  private producer: Producer;
  private consumers: Consumer[] = [];

  constructor() {
    this.kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID || 'optima-service',
      brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
      logLevel: logLevel.WARN,
      retry: {
        initialRetryTime: 300,
        retries: 8,
      },
    });

    this.producer = this.kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
      allowAutoTopicCreation: true,
    });
  }

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  async onModuleInit(): Promise<void> {
    await this.producer.connect();
    this.logger.log('Kafka producer connected.');
  }

  async onModuleDestroy(): Promise<void> {
    await this.producer.disconnect();
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
    this.logger.log('Kafka producer and consumers disconnected.');
  }

  // ─── Producer ─────────────────────────────────────────────────────────────

  /**
   * Emit a single event to a Kafka topic.
   *
   * Usage:
   *   await this.kafka.emit({
   *     topic: KAFKA_TOPICS.PURCHASE_REQUEST_CREATED,
   *     key: schemaId,
   *     payload: { source: 'request-service', schemaId, timestamp: new Date().toISOString(), data: pr },
   *   });
   */
  async emit<T = unknown>(options: KafkaEmitOptions<T>): Promise<void> {
    try {
      await this.producer.send({
        topic: options.topic,
        messages: [
          {
            key: options.key ?? null,
            value: JSON.stringify(options.payload),
          },
        ],
      });
      this.logger.debug(`[Kafka EMIT] topic=${options.topic} key=${options.key ?? '-'}`);
    } catch (error) {
      this.logger.error(`[Kafka EMIT error] topic=${options.topic} — ${error.message}`);
      throw error;
    }
  }

  /**
   * Emit multiple events in a single batch (same topic).
   */
  async emitBatch<T = unknown>(
    topic: string,
    events: Array<{ key?: string; payload: KafkaEventEnvelope<T> }>,
  ): Promise<void> {
    try {
      await this.producer.send({
        topic,
        messages: events.map((e) => ({
          key: e.key ?? null,
          value: JSON.stringify(e.payload),
        })),
      });
      this.logger.debug(`[Kafka BATCH EMIT] topic=${topic} count=${events.length}`);
    } catch (error) {
      this.logger.error(`[Kafka BATCH EMIT error] topic=${topic} — ${error.message}`);
      throw error;
    }
  }

  // ─── Consumer ─────────────────────────────────────────────────────────────

  /**
   * Subscribe to one or more topics with a named consumer group.
   *
   * Usage (call from a service's onModuleInit):
   *   await this.kafka.subscribe({
   *     groupId: 'notification-service',
   *     topics: [KAFKA_TOPICS.PURCHASE_REQUEST_CREATED],
   *     handler: async (payload) => { ... },
   *   });
   */
  async subscribe<T = unknown>(options: {
    groupId: string;
    topics: string[];
    handler: KafkaMessageHandler<T>;
    fromBeginning?: boolean;
  }): Promise<void> {
    const consumer = this.kafka.consumer({
      groupId: options.groupId,
      allowAutoTopicCreation: true,
    });

    await consumer.connect();

    for (const topic of options.topics) {
      await consumer.subscribe({
        topic,
        fromBeginning: options.fromBeginning ?? false,
      });
    }

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const strRaw = message.value?.toString();
          if (!strRaw) return;

          const objPayload: KafkaEventEnvelope<T> = JSON.parse(strRaw);
          this.logger.debug(`[Kafka RECV] topic=${topic} partition=${partition}`);
          await options.handler(objPayload, message);
        } catch (error) {
          this.logger.error(`[Kafka RECV error] topic=${topic} — ${error.message}`);
        }
      },
    });

    this.consumers.push(consumer);
    this.logger.log(`Kafka consumer subscribed: groupId=${options.groupId} topics=${options.topics.join(', ')}`);
  }
}
