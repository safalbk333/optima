import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { GoodsReceivedService } from './goods-received.service';
import { PrismaService } from 'libs/database/prisma-service';

describe('GoodsReceivedService', () => {
  let service: GoodsReceivedService;
  let prisma: PrismaService;

  const mockPrismaService = {
    gRN: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          GoodsReceivedService,
          {
            provide: PrismaService,
            useValue: mockPrismaService,
          },
        ],
      }).compile();

    service =
      module.get<GoodsReceivedService>(
        GoodsReceivedService,
      );

    prisma =
      module.get<PrismaService>(
        PrismaService,
      );

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return goods received list successfully', async () => {
      const mockGoodsReceived = [
        {
          id: '1',
          po_no: 'PO001',
          status: 1,
        },
      ];

      mockPrismaService.gRN.findMany.mockResolvedValue(
        mockGoodsReceived,
      );

      const result =
        await service.findAll({
          page: 1,
          limit: 10,
        });

      expect(
        prisma.gRN.findMany,
      ).toHaveBeenCalled();

      expect(result.success).toBe(true);

      expect(result.data).toEqual(
        mockGoodsReceived,
      );
    });

    it('should filter by status', async () => {
      const mockGoodsReceived = [
        {
          id: '1',
          status: 1,
        },
      ];

      mockPrismaService.gRN.findMany.mockResolvedValue(
        mockGoodsReceived,
      );

      await service.findAll({
        status: 'PARTIALLY_ACCEPTED',
      });

      expect(
        prisma.gRN.findMany,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: 1,
          }),
        }),
      );
    });

    it('should return error for invalid status', async () => {
      const result =
        await service.findAll({
          status: 'INVALID',
        });

      expect(result.success).toBe(false);

      expect(result.message).toBe(
        'Failed to fetch goods received',
      );
    });

    it('should search goods received', async () => {
      mockPrismaService.gRN.findMany.mockResolvedValue(
        [],
      );

      await service.findAll({
        search: 'PO001',
      });

      expect(
        prisma.gRN.findMany,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: expect.any(Array),
          }),
        }),
      );
    });

    it('should filter by warehouse', async () => {
      mockPrismaService.gRN.findMany.mockResolvedValue(
        [],
      );

      await service.findAll({
        warehouse: 'Main Warehouse',
      });

      expect(
        prisma.gRN.findMany,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            warehouse: expect.any(Object),
          }),
        }),
      );
    });
  });

  describe('findOne', () => {
    it('should return goods received by id', async () => {
      const mockGoodsReceived = {
        id: 'goods-id',
        po_no: 'PO001',
        status: 1,
      };

      mockPrismaService.gRN.findUnique.mockResolvedValue(
        mockGoodsReceived,
      );

      const result =
        await service.findOne(
          'goods-id',
        );

      expect(
        prisma.gRN.findUnique,
      ).toHaveBeenCalledWith({
        where: {
          id: 'goods-id',
        },
      });

      expect(result.success).toBe(true);

      expect(result.data).toEqual(
        mockGoodsReceived,
      );
    });

    it('should throw not found exception', async () => {
      mockPrismaService.gRN.findUnique.mockResolvedValue(
        null,
      );

      await expect(
        service.findOne('invalid-id'),
      ).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should handle prisma error', async () => {
      mockPrismaService.gRN.findUnique.mockRejectedValue(
        new Error('Database Error'),
      );

      await expect(
        service.findOne('goods-id'),
      ).rejects.toThrow(
        'Database Error',
      );
    });
  });
});