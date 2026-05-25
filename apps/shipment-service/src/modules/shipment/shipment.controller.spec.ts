import { Test, TestingModule } from '@nestjs/testing';

import { ShipmentController } from './shipment.controller';
import { ShipmentService } from './shipment.service';

describe('ShipmentController', () => {
  let controller: ShipmentController;
  let service: ShipmentService;

  const mockShipmentService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [ShipmentController],
        providers: [
          {
            provide: ShipmentService,
            useValue: mockShipmentService,
          },
        ],
      }).compile();

    controller =
      module.get<ShipmentController>(
        ShipmentController,
      );

    service =
      module.get<ShipmentService>(
        ShipmentService,
      );

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all shipments', async () => {
      const payload = {
        page: 1,
        limit: 10,
        search: 'PO001',
        status: 'DELIVERED',
      };

      const mockResponse = {
        success: true,
        data: [
          {
            id: 'shipment-id',
            po_no: 'PO001',
          },
        ],
        message:
          'Shipments fetched successfully',
      };

      mockShipmentService.findAll.mockResolvedValue(
        mockResponse,
      );

      const result =
        await controller.findAll(payload);

      expect(service.findAll).toHaveBeenCalledWith(
        payload,
      );

      expect(result).toEqual(
        mockResponse,
      );
    });

    it('should handle empty payload', async () => {
      const payload = {};

      const mockResponse = {
        success: true,
        data: [],
        message:
          'Shipments fetched successfully',
      };

      mockShipmentService.findAll.mockResolvedValue(
        mockResponse,
      );

      const result =
        await controller.findAll(payload);

      expect(service.findAll).toHaveBeenCalledWith(
        payload,
      );

      expect(result).toEqual(
        mockResponse,
      );
    });

    it('should throw error if service fails', async () => {
      const payload = {
        page: 1,
      };

      mockShipmentService.findAll.mockRejectedValue(
        new Error('Service Error'),
      );

      await expect(
        controller.findAll(payload),
      ).rejects.toThrow(
        'Service Error',
      );
    });
  });

  describe('findOne', () => {
    it('should return shipment by id', async () => {
      const shipmentId = 'shipment-id';

      const mockResponse = {
        success: true,
        data: {
          id: shipmentId,
          po_no: 'PO001',
        },
        message:
          'Shipment fetched successfully',
      };

      mockShipmentService.findOne.mockResolvedValue(
        mockResponse,
      );

      const result =
        await controller.findOne({
          id: shipmentId,
        });

      expect(service.findOne).toHaveBeenCalledWith(
        shipmentId,
      );

      expect(result).toEqual(
        mockResponse,
      );
    });

    it('should throw error when shipment not found', async () => {
      mockShipmentService.findOne.mockRejectedValue(
        new Error('Shipment not found'),
      );

      await expect(
        controller.findOne({
          id: 'invalid-id',
        }),
      ).rejects.toThrow(
        'Shipment not found',
      );
    });
  });
});