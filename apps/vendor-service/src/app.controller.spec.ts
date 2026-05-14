import { Test, TestingModule } from '@nestjs/testing';
import { VendorController } from './modules/vendor/vendor.controller';

describe('VendorServiceController', () => {
  let vendorServiceController: VendorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [vendorServiceController],
      providers: [VendorServiceService],
    }).compile();

    vendorServiceController = app.get<VendorServiceController>(VendorServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(vendorServiceController.getHello()).toBe('Hello World!');
    });
  });
});
