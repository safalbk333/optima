import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [ // ✅ ENV Configuration
          ConfigModule.forRoot({
            isGlobal: true,
          }),],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}
