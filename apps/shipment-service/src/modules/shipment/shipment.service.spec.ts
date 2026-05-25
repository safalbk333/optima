import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { ShipmentService } from './shipment.service';
import { PrismaService } from 'libs/database/prisma-service';

describe('ShipmentService', () => {
  let service: ShipmentService;
  let prisma: PrismaService;

  const mockPrismaService = {
    shipment: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          ShipmentService,
          {
            provide: PrismaService,
            useValue: mockPrismaService,
          },
        ],
      }).compile();

    service =
      module.get<ShipmentService>(
        ShipmentService,
      );

    prisma =
      module.get<PrismaService>(
        PrismaService,
      );

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return shipments successfully', async () => {
      const mockShipments = [
        {
          id: '1',
          po_no: 'PO001',
          status: 1,
        },
      ];

      mockPrismaService.shipment.findMany.mockResolvedValue(
        mockShipments,
      );

      const result =
        await service.findAll({
          page: 1,
          limit: 10,
        });

      expect(
        prisma.shipment.findMany,
      ).toHaveBeenCalled();

      expect(result.success).toBe(true);

      expect(result.data).toEqual(
        mockShipments,
      );
    });

    it('should filter by status', async () => {
      const mockShipments = [
        {
          id: '1',
          status: 1,
        },
      ];

      mockPrismaService.shipment.findMany.mockResolvedValue(
        mockShipments,
      );

      await service.findAll({
        status: 'DELIVERED',
      });

      expect(
        prisma.shipment.findMany,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: 1,
          }),
        }),
      );
    });

    it('should throw invalid status error', async () => {
      const result =
        await service.findAll({
          status: 'INVALID',
        });

      expect(result.success).toBe(false);

      expect(result.message).toBe(
        'Failed to fetch shipments',
      );
    });

    it('should search shipments', async () => {
      mockPrismaService.shipment.findMany.mockResolvedValue(
        [],
      );

      await service.findAll({
        search: 'PO001',
      });

      expect(
        prisma.shipment.findMany,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: expect.any(Array),
          }),
        }),
      );
    });
  });

  describe('findOne', () => {
    it('should return shipment by id', async () => {
      const mockShipment = {
        id: 'shipment-id',
        po_no: 'PO001',
        tracking: {
          id: 'tracking-id',
        },
      };

      mockPrismaService.shipment.findUnique.mockResolvedValue(
        mockShipment,
      );

      const result =
        await service.findOne(
          'shipment-id',
        );

      expect(
        prisma.shipment.findUnique,
      ).toHaveBeenCalledWith({
        where: {
          id: 'shipment-id',
        },
        include: {
          tracking: true,
        },
      });

      expect(result.success).toBe(true);

      expect(result.data).toEqual(
        mockShipment,
      );
    });

    it('should throw not found exception', async () => {
      mockPrismaService.shipment.findUnique.mockResolvedValue(
        null,
      );

      await expect(
        service.findOne('invalid-id'),
      ).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should handle prisma error', async () => {
      mockPrismaService.shipment.findUnique.mockRejectedValue(
        new Error('Database Error'),
      );

      await expect(
        service.findOne('shipment-id'),
      ).rejects.toThrow(
        'Database Error',
      );
    });
  });
});