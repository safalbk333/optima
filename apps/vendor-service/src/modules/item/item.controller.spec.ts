import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

describe('ItemController', () => {
  let controller: ItemController;
  let service: ItemService;

  const mockItemService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        {
          provide: ItemService,
          useValue: mockItemService,
        },
      ],
    }).compile();

    controller = module.get<ItemController>(ItemController);

    service = module.get<ItemService>(ItemService);
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
        item_name: dto.itemName,
        item_code: dto.itemCode,
      };

      mockItemService.create.mockResolvedValue(
        mockResponse,
      );

      const result = await controller.create(dto as any);

      expect(service.create).toHaveBeenCalledWith(dto);

      expect(result).toEqual(mockResponse);
    });
  });

  describe('findAll', () => {
    it('should return all items', async () => {
      const mockResponse = [
        {
          id: '1',
          item_name: 'Laptop',
          item_code: 'LP-001',
        },
      ];

      mockItemService.findAll.mockResolvedValue(
        mockResponse,
      );

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();

      expect(result).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return item by id', async () => {
      const payload = {
        id: '1',
      };

      const mockResponse = {
        id: '1',
        item_name: 'Laptop',
      };

      mockItemService.findOne.mockResolvedValue(
        mockResponse,
      );

      const result = await controller.findOne(payload);

      expect(service.findOne).toHaveBeenCalledWith('1');

      expect(result).toEqual(mockResponse);
    });
  });
});