import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryGatewayService } from './category.service';

const mockCategory = {
  categoryId: 'cat-uuid-1',
  categoryName: 'Electronics',
  isActive: true,
  isDeleted: false,
};

const mockCategoryGatewayService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CategoryController (api-gateway)', () => {
  let controller: CategoryController;
  let service: typeof mockCategoryGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryGatewayService,
          useValue: mockCategoryGatewayService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get(CategoryGatewayService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ── findAll ────────────────────────────────────────────

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories = [mockCategory];
      service.findAll.mockResolvedValue(categories);

      const result = await controller.findAll();

      expect(result).toEqual(categories);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  // ── findOne ────────────────────────────────────────────

  describe('findOne', () => {
    it('should return a category by ID', async () => {
      service.findOne.mockResolvedValue(mockCategory);

      const result = await controller.findOne('cat-uuid-1');

      expect(result).toEqual(mockCategory);
      expect(service.findOne).toHaveBeenCalledWith('cat-uuid-1');
    });
  });

  // ── create ─────────────────────────────────────────────

  describe('create', () => {
    it('should create and return a new category', async () => {
      const dto = { categoryName: 'Furniture' };
      const created = { ...mockCategory, categoryName: 'Furniture' };
      service.create.mockResolvedValue(created);

      const result = await controller.create(dto);

      expect(result).toEqual(created);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  // ── update ─────────────────────────────────────────────

  describe('update', () => {
    it('should update and return the category', async () => {
      const dto = { categoryName: 'Updated' };
      const updated = { ...mockCategory, categoryName: 'Updated' };
      service.update.mockResolvedValue(updated);

      const result = await controller.update('cat-uuid-1', dto);

      expect(result).toEqual(updated);
      expect(service.update).toHaveBeenCalledWith('cat-uuid-1', dto);
    });
  });

  // ── delete ─────────────────────────────────────────────

  describe('delete', () => {
    it('should delete and return the result', async () => {
      const deleted = { ...mockCategory, isDeleted: true, isActive: false };
      service.delete.mockResolvedValue(deleted);

      const result = await controller.delete('cat-uuid-1');

      expect(result).toEqual(deleted);
      expect(service.delete).toHaveBeenCalledWith('cat-uuid-1');
    });
  });
});
