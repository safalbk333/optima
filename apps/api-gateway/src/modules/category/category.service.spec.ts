import { Test, TestingModule } from '@nestjs/testing';
import { CategoryGatewayService } from './category.service';
import { CATEGORY_PATTERN } from './category.pattern';
import { of } from 'rxjs';

const mockCategory = {
  categoryId: 'cat-uuid-1',
  categoryName: 'Electronics',
  isActive: true,
  isDeleted: false,
};

const mockClientProxy = {
  send: jest.fn(),
};

describe('CategoryGatewayService', () => {
  let service: CategoryGatewayService;
  let client: typeof mockClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryGatewayService,
        {
          provide: 'VENDOR_SERVICE',
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    service = module.get<CategoryGatewayService>(CategoryGatewayService);
    client = module.get('VENDOR_SERVICE');

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ── findAll ────────────────────────────────────────────

  describe('findAll', () => {
    it('should send FIND_ALL pattern and return categories', async () => {
      const categories = [mockCategory];
      client.send.mockReturnValue(of(categories));

      const result = await service.findAll();

      expect(result).toEqual(categories);
      expect(client.send).toHaveBeenCalledWith(
        CATEGORY_PATTERN.FIND_ALL,
        {},
      );
    });
  });

  // ── findOne ────────────────────────────────────────────

  describe('findOne', () => {
    it('should send FIND_ONE pattern with id and return a category', async () => {
      client.send.mockReturnValue(of(mockCategory));

      const result = await service.findOne('cat-uuid-1');

      expect(result).toEqual(mockCategory);
      expect(client.send).toHaveBeenCalledWith(
        CATEGORY_PATTERN.FIND_ONE,
        'cat-uuid-1',
      );
    });
  });

  // ── create ─────────────────────────────────────────────

  describe('create', () => {
    it('should send CREATE pattern with dto and return the created category', async () => {
      const dto = { categoryName: 'Furniture' };
      const created = { ...mockCategory, categoryName: 'Furniture' };
      client.send.mockReturnValue(of(created));

      const result = await service.create(dto);

      expect(result).toEqual(created);
      expect(client.send).toHaveBeenCalledWith(
        CATEGORY_PATTERN.CREATE,
        dto,
      );
    });
  });

  // ── update ─────────────────────────────────────────────

  describe('update', () => {
    it('should send UPDATE pattern with id and data', async () => {
      const dto = { categoryName: 'Updated' };
      const updated = { ...mockCategory, categoryName: 'Updated' };
      client.send.mockReturnValue(of(updated));

      const result = await service.update('cat-uuid-1', dto);

      expect(result).toEqual(updated);
      expect(client.send).toHaveBeenCalledWith(
        CATEGORY_PATTERN.UPDATE,
        { id: 'cat-uuid-1', data: dto },
      );
    });
  });

  // ── delete ─────────────────────────────────────────────

  describe('delete', () => {
    it('should send DELETE pattern with id and return the result', async () => {
      const deleted = { ...mockCategory, isDeleted: true, isActive: false };
      client.send.mockReturnValue(of(deleted));

      const result = await service.delete('cat-uuid-1');

      expect(result).toEqual(deleted);
      expect(client.send).toHaveBeenCalledWith(
        CATEGORY_PATTERN.DELETE,
        'cat-uuid-1',
      );
    });
  });
});
