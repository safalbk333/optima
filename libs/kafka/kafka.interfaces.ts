import { KafkaTopic } from './kafka.topics';

/**
 * Base envelope wrapping every Kafka event.
 * Every producer sets these fields; consumers can rely on them.
 */
export interface KafkaEventEnvelope<T = unknown> {
  /** Originating microservice name, e.g. 'request-service' */
  source: string;
  /** ISO-8601 timestamp of when the event was emitted */
  timestamp: string;
  /** Tenant schema identifier */
  schemaId: string;
  /** Domain-specific payload */
  data: T;
}

/**
 * Options accepted by KafkaService.emit()
 */
export interface KafkaEmitOptions<T = unknown> {
  topic: KafkaTopic | string;
  /** Kafka message key — used for partition routing (e.g. tenantId or entityId) */
  key?: string;
  payload: KafkaEventEnvelope<T>;
}

/**
 * Handler signature registered via KafkaService.subscribe()
 */
export type KafkaMessageHandler<T = unknown> = (
  payload: KafkaEventEnvelope<T>,
  rawMessage: any,
) => Promise<void> | void;
