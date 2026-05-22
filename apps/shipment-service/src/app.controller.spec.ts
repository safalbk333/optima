import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentServiceController } from './modules/shipment/shipment.service.controller';
import { ShipmentGatewayService } from 'apps/api-gateway/src/modules/shipment/shipment.service';

describe('ShipmentServiceController', () => {
  let shipmentServiceController: ShipmentServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShipmentServiceController],
      providers: [ShipmentGatewayService],
    }).compile();

    shipmentServiceController = app.get<ShipmentServiceController>(ShipmentServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(shipmentServiceController.getHello()).toBe('Hello World!');
    });
  });
});
