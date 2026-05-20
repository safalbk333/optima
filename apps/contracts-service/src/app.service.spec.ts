import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HttpStatus } from '@nestjs/common';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('healthCheck', () => {
    it('should return health check response', () => {
      const result = service.healthCheck();

      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('statusCode', HttpStatus.OK);
      expect(result).toHaveProperty('message', 'contract Service is running successfully');
      expect(result.data).toHaveProperty('service', 'contract-service');
      expect(result.data).toHaveProperty('status', 'UP');
      expect(result.data).toHaveProperty('timestamp');
    });
  });
});
