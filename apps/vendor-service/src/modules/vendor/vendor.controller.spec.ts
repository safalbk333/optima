import { Test, TestingModule } from '@nestjs/testing';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';

describe('VendorController', () => {
  let controller: VendorController;
  let service: VendorService;

  const mockVendorService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorController],
      providers: [
        {
          provide: VendorService,
          useValue: mockVendorService,
        },
      ],
    }).compile();

    controller = module.get<VendorController>(
      VendorController,
    );

    service = module.get<VendorService>(VendorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all vendors', async () => {
      const mockResponse = [
        {
          id: '1',
          vendor_name: 'ABC Vendor',
          vendor_email: 'abc@test.com',
        },
      ];

      mockVendorService.findAll.mockResolvedValue(
        mockResponse,
      );

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();

      expect(result).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return vendor by id', async () => {
      const payload = {
        vendor_id: '1',
      };

      const mockResponse = {
        id: '1',
        vendor_name: 'ABC Vendor',
      };

      mockVendorService.findOne.mockResolvedValue(
        mockResponse,
      );

      const result = await controller.findOne(payload);

      expect(service.findOne).toHaveBeenCalledWith('1');

      expect(result).toEqual(mockResponse);
    });
  });

  describe('create', () => {
    it('should create vendor successfully', async () => {
      const dto = {
        name: 'ABC Vendor',
        email: 'abc@test.com',
        phone: '9876543210',
      };

      const mockResponse = {
        id: '1',
        vendor_name: dto.name,
        vendor_email: dto.email,
        vendor_phone: dto.phone,
      };

      mockVendorService.create.mockResolvedValue(
        mockResponse,
      );

      const result = await controller.create(dto as any);

      expect(service.create).toHaveBeenCalledWith(dto);

      expect(result).toEqual(mockResponse);
    });
  });
});