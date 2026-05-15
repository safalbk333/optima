import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

const mockCategory = {
  categoryId: 'cat-uuid-1',
  categoryName: 'Electronics',
  isActive: true,
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

const mockCategoryService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CategoryController (vendor-service)', () => {
  let controller: CategoryController;
  let service: typeof mockCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get(CategoryService);

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
    it('should return a single category', async () => {
      service.findOne.mockResolvedValue(mockCategory);

      const result = await controller.findOne('cat-uuid-1');

      expect(result).toEqual(mockCategory);
      expect(service.findOne).toHaveBeenCalledWith('cat-uuid-1');
    });
  });

  // ── create ─────────────────────────────────────────────

  describe('create', () => {
    it('should create and return a category', async () => {
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
      const payload = {
        id: 'cat-uuid-1',
        data: { categoryName: 'Updated' },
      };
      const updated = { ...mockCategory, categoryName: 'Updated' };
      service.update.mockResolvedValue(updated);

      const result = await controller.update(payload);

      expect(result).toEqual(updated);
      expect(service.update).toHaveBeenCalledWith(
        payload.id,
        payload.data,
      );
    });
  });

  // ── delete ─────────────────────────────────────────────

  describe('delete', () => {
    it('should soft-delete and return the category', async () => {
      const deleted = { ...mockCategory, isDeleted: true, isActive: false };
      service.delete.mockResolvedValue(deleted);

      const result = await controller.delete('cat-uuid-1');

      expect(result).toEqual(deleted);
      expect(service.delete).toHaveBeenCalledWith('cat-uuid-1');
    });
  });
});
