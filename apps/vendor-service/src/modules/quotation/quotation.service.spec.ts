import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { PrismaService } from 'libs/database/prisma-service';
import Quotation_status from '../constant/enum';
// import { afterEach, beforeEach, describe, it } from 'node:test';

describe('QuotationService', () => {
  let service: QuotationService;
  let prisma: PrismaService;

  const mockPrismaService = {
    quotation: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuotationService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<QuotationService>(QuotationService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create quotation successfully', async () => {
      const dto = {
        vendorId: 'vendor-1',
        rfqTitle: 'Laptop Purchase',
        category: 'IT',
        issueDate: new Date(),
        dueDate: new Date(),
        buyer: 'John',
        status: 'APPROVED',
      };

      jest
        .spyOn(service, 'generateRfqNo')
        .mockResolvedValue('RFQ-2026-MAY-001');

      mockPrismaService.quotation.create.mockResolvedValue({
        id: '1',
        rfq_no: 'RFQ-2026-MAY-001',
        status: 4,
      });

      const result = await service.create(dto as any);

      expect(service.generateRfqNo).toHaveBeenCalled();

      expect(prisma.quotation.create).toHaveBeenCalledWith({
        data: {
          vendor_id: dto.vendorId,
          rfq_no: 'RFQ-2026-MAY-001',
          rfq_title: dto.rfqTitle,
          category: dto.category,
          issue_date: dto.issueDate,
          due_date: dto.dueDate,
          buyer: dto.buyer,
          status: Quotation_status.APPROVED,
        },
      });

      expect(result).toEqual({
        id: '1',
        rfq_no: 'RFQ-2026-MAY-001',
        status: 4,
      });
    });

    it('should throw error for invalid status', async () => {
      const dto = {
        status: 'INVALID_STATUS',
      };

      await expect(service.create(dto as any)).rejects.toThrow(
        'Invalid quotation status',
      );
    });
  });

  describe('findAll', () => {
    it('should return quotations list', async () => {
      const mockData = [
        {
          id: '1',
          rfq_no: 'RFQ-2026-MAY-001',
        },
      ];

      mockPrismaService.quotation.findMany.mockResolvedValue(mockData);

      const result = await service.findAll({
        page: 1,
        limit: 10,
        search: 'RFQ',
        status: 'APPROVED',
      });

      expect(prisma.quotation.findMany).toHaveBeenCalled();

      expect(result).toEqual(mockData);
    });

    it('should throw error for invalid status filter', async () => {
      await expect(
        service.findAll({
          status: 'INVALID',
        }),
      ).rejects.toThrow('Invalid quotation status');
    });
  });

  describe('findOne', () => {
    it('should return quotation by id', async () => {
      const mockQuotation = {
        id: '1',
        rfq_no: 'RFQ-2026-MAY-001',
      };

      mockPrismaService.quotation.findUnique.mockResolvedValue(
        mockQuotation,
      );

      const result = await service.findOne('1');

      expect(prisma.quotation.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });

      expect(result).toEqual(mockQuotation);
    });

    it('should throw NotFoundException if quotation not found', async () => {
      mockPrismaService.quotation.findUnique.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('generateRfqNo', () => {
    it('should generate next RFQ number', async () => {
      mockPrismaService.quotation.findFirst.mockResolvedValue({
        rfq_no: 'RFQ-2026-MAY-001',
      });

      const result = await service.generateRfqNo();

      expect(result).toContain('RFQ-');
      expect(result.endsWith('002')).toBeTruthy();
    });

    it('should generate first RFQ number when no previous RFQ exists', async () => {
      mockPrismaService.quotation.findFirst.mockResolvedValue(null);

      const result = await service.generateRfqNo();

      expect(result).toContain('001');
    });
  });
});