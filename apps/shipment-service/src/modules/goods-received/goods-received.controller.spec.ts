import { Test, TestingModule } from '@nestjs/testing';

import { GoodsReceivedController } from './goods-received.controller';
import { GoodsReceivedService } from './goods-received.service';

describe('GoodsReceivedController', () => {
  let controller: GoodsReceivedController;
  let service: GoodsReceivedService;

  const mockGoodsReceivedService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [GoodsReceivedController],
        providers: [
          {
            provide: GoodsReceivedService,
            useValue: mockGoodsReceivedService,
          },
        ],
      }).compile();

    controller =
      module.get<GoodsReceivedController>(
        GoodsReceivedController,
      );

    service =
      module.get<GoodsReceivedService>(
        GoodsReceivedService,
      );

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all goods received records', async () => {
      const payload = {
        page: 1,
        limit: 10,
        search: 'PO001',
        status: 'ACCEPTED',
      };

      const mockResponse = {
        success: true,
        data: [
          {
            id: 'goods-id',
            po_no: 'PO001',
          },
        ],
        message:
          'Goods received list fetched successfully',
      };

      mockGoodsReceivedService.findAll.mockResolvedValue(
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
          'Goods received list fetched successfully',
      };

      mockGoodsReceivedService.findAll.mockResolvedValue(
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

      mockGoodsReceivedService.findAll.mockRejectedValue(
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
    it('should return goods received by id', async () => {
      const goodsReceivedId = 'goods-id';

      const mockResponse = {
        success: true,
        data: {
          id: goodsReceivedId,
          po_no: 'PO001',
        },
        message:
          'Goods received fetched successfully',
      };

      mockGoodsReceivedService.findOne.mockResolvedValue(
        mockResponse,
      );

      const result =
        await controller.findOne({
          id: goodsReceivedId,
        });

      expect(service.findOne).toHaveBeenCalledWith(
        goodsReceivedId,
      );

      expect(result).toEqual(
        mockResponse,
      );
    });

    it('should throw error when goods received not found', async () => {
      mockGoodsReceivedService.findOne.mockRejectedValue(
        new Error('Goods received not found'),
      );

      await expect(
        controller.findOne({
          id: 'invalid-id',
        }),
      ).rejects.toThrow(
        'Goods received not found',
      );
    });
  });
});