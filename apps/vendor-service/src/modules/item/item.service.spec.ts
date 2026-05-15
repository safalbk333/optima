import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ItemService } from './item.service';
import { PrismaService } from 'libs/database/prisma-service';

describe('ItemService', () => {
  let service: ItemService;
  let prisma: PrismaService;

  const mockPrismaService = {
    item: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ItemService>(ItemService);

    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create item successfully', async () => {
      const dto = {
        vendorId: 'vendor-1',
        quotationId: 'quotation-1',
        itemName: 'Laptop',
        itemCode: 'LP-001',
        description: 'Dell Laptop',
        quantity: 10,
        unit: 'PCS',
        document: 'document.pdf',
      };

      const mockResponse = {
        id: '1',
        vendor_id: dto.vendorId,
        quotation_id: dto.quotationId,
        item_name: dto.itemName,
        item_code: dto.itemCode,
      };

      mockPrismaService.item.create.mockResolvedValue(
        mockResponse,
      );

      const result = await service.create(dto as any);

      expect(prisma.item.create).toHaveBeenCalledWith({
        data: {
          vendor_id: dto.vendorId,
          quotation_id: dto.quotationId,
          item_name: dto.itemName,
          item_code: dto.itemCode,
          description: dto.description,
          quantity: dto.quantity,
          unit: dto.unit,
          documents: dto.document,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe('findAll', () => {
    it('should return all items', async () => {
      const mockItems = [
        {
          id: '1',
          item_name: 'Laptop',
          item_code: 'LP-001',
        },
      ];

      mockPrismaService.item.findMany.mockResolvedValue(
        mockItems,
      );

      const result = await service.findAll();

      expect(prisma.item.findMany).toHaveBeenCalled();

      expect(result).toEqual(mockItems);
    });
  });

  describe('findOne', () => {
    it('should return item by id', async () => {
      const mockItem = {
        id: '1',
        item_name: 'Laptop',
      };

      mockPrismaService.item.findUnique.mockResolvedValue(
        mockItem,
      );

      const result = await service.findOne('1');

      expect(prisma.item.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });

      expect(result).toEqual(mockItem);
    });

    it('should throw NotFoundException when item not found', async () => {
      mockPrismaService.item.findUnique.mockResolvedValue(
        null,
      );

      await expect(service.findOne('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});