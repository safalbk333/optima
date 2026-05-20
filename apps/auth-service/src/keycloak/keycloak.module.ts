import { Module } from '@nestjs/common';
import { KeycloakController } from './keycloak.controller';
import { KeycloakService } from './keycloak.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [KeycloakController],
  providers: [
    KeycloakService,
    {
      provide: 'MASTER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: process.env.MASTER_SERVICE_HOST || 'localhost',
            port: parseInt(process.env.MASTER_SERVICE_PORT || '3016'),
          },
        });
      },
    },
  ],
})
export class KeycloakModule {}
