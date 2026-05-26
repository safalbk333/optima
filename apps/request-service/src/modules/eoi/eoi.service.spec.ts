import { Test, TestingModule } from '@nestjs/testing';
import { EoiService } from './eoi.service';

describe('EoiService', () => {
  let service: EoiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EoiService],
    }).compile();

    service = module.get<EoiService>(EoiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
