import { Test, TestingModule } from '@nestjs/testing';
import { QuotationController } from './quotation.controller';
import { QuotationService } from './quotation.service';

describe('QuotationController', () => {
  let controller: QuotationController;
  let service: QuotationService;

  const mockQuotationService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotationController],
      providers: [
        {
          provide: QuotationService,
          useValue: mockQuotationService,
        },
      ],
    }).compile();

    controller = module.get<QuotationController>(
      QuotationController,
    );

    service = module.get<QuotationService>(
      QuotationService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create quotation', async () => {
      const dto = {
        vendorId: 'vendor-1',
        rfqTitle: 'Laptop Purchase',
        category: 'IT',
        issueDate: new Date(),
        dueDate: new Date(),
        buyer: 'John',
        status: 'APPROVED',
      };

      const mockResponse = {
        id: '1',
        rfq_no: 'RFQ-2026-MAY-001',
      };

      mockQuotationService.create.mockResolvedValue(
        mockResponse,
      );

      const result = await controller.create(dto as any);

      expect(service.create).toHaveBeenCalledWith(dto);

      expect(result).toEqual(mockResponse);
    });
  });

  describe('findAll', () => {
    it('should return quotations', async () => {
      const payload = {
        page: 1,
        limit: 10,
        search: 'RFQ',
        status: 'APPROVED',
      };

      const mockResponse = [
        {
          id: '1',
          rfq_no: 'RFQ-2026-MAY-001',
        },
      ];

      mockQuotationService.findAll.mockResolvedValue(
        mockResponse,
      );

      const result = await controller.findAll(payload);

      expect(service.findAll).toHaveBeenCalledWith(
        payload,
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return quotation by id', async () => {
      const payload = {
        quotation_id: '1',
      };

      const mockResponse = {
        id: '1',
        rfq_no: 'RFQ-2026-MAY-001',
      };

      mockQuotationService.findOne.mockResolvedValue(
        mockResponse,
      );

      const result = await controller.findOne(payload);

      expect(service.findOne).toHaveBeenCalledWith('1');

      expect(result).toEqual(mockResponse);
    });
  });
});