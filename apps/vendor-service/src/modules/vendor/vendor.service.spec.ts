import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { PrismaService } from 'libs/database/prisma-service';

describe('VendorService', () => {
  let service: VendorService;
  let prisma: PrismaService;

  const mockPrismaService = {
    vendor: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendorService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<VendorService>(VendorService);

    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all vendors', async () => {
      const mockVendors = [
        {
          id: '1',
          vendor_name: 'ABC Vendor',
          vendor_email: 'abc@test.com',
          vendor_phone: '9876543210',
        },
      ];

      mockPrismaService.vendor.findMany.mockResolvedValue(
        mockVendors,
      );

      const result = await service.findAll();

      expect(prisma.vendor.findMany).toHaveBeenCalled();

      expect(result).toEqual(mockVendors);
    });
  });

  describe('findOne', () => {
    it('should return vendor by id', async () => {
      const mockVendor = {
        id: '1',
        vendor_name: 'ABC Vendor',
      };

      mockPrismaService.vendor.findUnique.mockResolvedValue(
        mockVendor,
      );

      const result = await service.findOne('1');

      expect(prisma.vendor.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });

      expect(result).toEqual(mockVendor);
    });

    it('should throw NotFoundException when vendor not found', async () => {
      mockPrismaService.vendor.findUnique.mockResolvedValue(
        null,
      );

      await expect(service.findOne('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create vendor successfully', async () => {
      const dto = {
        name: 'ABC Vendor',
        email: 'abc@test.com',
        phone: '9876543210',
      };

      const mockVendor = {
        id: '1',
        vendor_name: dto.name,
        vendor_email: dto.email,
        vendor_phone: dto.phone,
      };

      mockPrismaService.vendor.create.mockResolvedValue(
        mockVendor,
      );

      const result = await service.create(dto as any);

      expect(prisma.vendor.create).toHaveBeenCalledWith({
        data: {
          vendor_name: dto.name,
          vendor_email: dto.email,
          vendor_phone: dto.phone,
        },
      });

      expect(result).toEqual(mockVendor);
    });
  });
});