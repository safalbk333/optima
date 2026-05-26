import { Test, TestingModule } from '@nestjs/testing';
import { EoiController } from './eoi.controller';

describe('EoiController', () => {
  let controller: EoiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EoiController],
    }).compile();

    controller = module.get<EoiController>(EoiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
