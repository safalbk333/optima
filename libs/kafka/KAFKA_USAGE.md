# Kafka Global Service — Usage Guide

## Setup (once per microservice AppModule)

```typescript
// apps/your-service/src/app.module.ts
import { KafkaModule } from 'libs/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, ... }),
    KafkaModule,   // ← add this once; KafkaService is available everywhere
    ...
  ],
})
export class AppModule {}
```

---

## Emitting an event (Producer)

```typescript
import { Injectable } from '@nestjs/common';
import { KafkaService, KAFKA_TOPICS } from 'libs/kafka';

@Injectable()
export class PurchaseRequestService {
  constructor(private readonly kafka: KafkaService) {}

  async create(strSchemaId: string, dto: CreatePurchaseRequestDto) {
    const objPR = await this.prisma.tbl_purchase_request.create({ data: { ... } });

    // Fire-and-forget event — other services react asynchronously
    await this.kafka.emit({
      topic: KAFKA_TOPICS.PURCHASE_REQUEST_CREATED,
      key: strSchemaId,                          // routes to same partition per tenant
      payload: {
        source: 'request-service',
        schemaId: strSchemaId,
        timestamp: new Date().toISOString(),
        data: objPR,
      },
    });

    return objPR;
  }
}
```

---

## Consuming events (Consumer)

Call `kafka.subscribe()` inside `onModuleInit` of any service that needs to react:

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService, KAFKA_TOPICS, KafkaEventEnvelope } from 'libs/kafka';

@Injectable()
export class NotificationService implements OnModuleInit {
  constructor(private readonly kafka: KafkaService) {}

  async onModuleInit() {
    await this.kafka.subscribe({
      groupId: 'notification-service-group',     // unique per consumer group
      topics: [
        KAFKA_TOPICS.PURCHASE_REQUEST_CREATED,
        KAFKA_TOPICS.PURCHASE_ORDER_CREATED,
        KAFKA_TOPICS.INVOICE_APPROVED,
      ],
      handler: async (payload: KafkaEventEnvelope) => {
        // payload.source, payload.schemaId, payload.data are all typed
        console.log('Received event from', payload.source, payload.data);
        // send email / push notification / etc.
      },
    });
  }
}
```

---

## Available Topics  (`libs/kafka/kafka.topics.ts`)

| Constant | Topic string |
|---|---|
| `PURCHASE_REQUEST_CREATED` | `purchase-request.created` |
| `PURCHASE_REQUEST_APPROVED` | `purchase-request.approved` |
| `EOI_CREATED` | `eoi.created` |
| `RFQ_CREATED` | `rfq.created` |
| `QUOTATION_SUBMITTED` | `quotation.submitted` |
| `PURCHASE_ORDER_CREATED` | `purchase-order.created` |
| `SHIPMENT_CREATED` | `shipment.created` |
| `GOODS_RECEIPT_CREATED` | `goods-receipt.created` |
| `INVOICE_CREATED` | `invoice.created` |
| `VENDOR_CREATED` | `vendor.created` |
| `USER_CREATED` | `user.created` |
| `NOTIFICATION_SEND` | `notification.send` |

Add new topics in `libs/kafka/kafka.topics.ts` — never hard-code strings.

---

## Environment Variables (already added to all .env files)

```
KAFKA_BROKERS=localhost:9092        # dev
KAFKA_BROKERS=kafka:29092           # production (docker internal)
KAFKA_CLIENT_ID=your-service-name
```

---

## Docker

Kafka + Zookeeper + Kafka-UI are already added to `docker-compose.yml`.

- Kafka broker: `localhost:9092`
- Kafka UI: `http://localhost:8090`
