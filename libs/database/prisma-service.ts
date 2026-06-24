import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
 implements OnModuleInit, OnModuleDestroy {
  private readonly clients = new Map<string, PrismaClient>();

// async onModuleInit() {
//     await this.$connect();
//     console.log('Prisma connected');
//   }

//   async onModuleDestroy() {
//     await this.$disconnect();
//   }

  async getClient(schema: string): Promise<PrismaClient> {
    if (!this.clients.has(schema)) {
      const client = new PrismaClient({
        datasources: {
          db: {
            url: `${process.env.DATABASE_URL}?schema=${schema}`,
          },
        },
      });

      await client.$connect();

      console.log(`Prisma connected for schema: ${schema}`);

      this.clients.set(schema, client);
    }

    return this.clients.get(schema)!;
  }
  async onModuleInit() {
    console.log('Master Prisma connected');
  }

  async onModuleDestroy() {
    for (const client of this.clients.values()) {
      await client.$disconnect();
    }
  }
}


