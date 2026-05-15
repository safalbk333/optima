import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { PrismaService } from '../../../../../libs/database/prisma-service';

const mockCategory = {
  categoryId: 'cat-uuid-1',
  categoryName: 'Electronics',
  isActive: true,
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

const mockPrismaService = {
  category: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('CategoryService', () => {
  let service: CategoryService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    prisma = module.get(PrismaService);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ── findAll ────────────────────────────────────────────

  describe('findAll', () => {
    it('should return an array of active categories', async () => {
      const categories = [mockCategory];
      prisma.category.findMany.mockResolvedValue(categories);

      const result = await service.findAll();

      expect(result).toEqual(categories);
      expect(prisma.category.findMany).toHaveBeenCalledWith({
        where: { isDeleted: false },
      });
    });

    it('should return an empty array when no categories exist', async () => {
      prisma.category.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  // ── findOne ────────────────────────────────────────────

  describe('findOne', () => {
    it('should return a single category by ID', async () => {
      prisma.category.findUnique.mockResolvedValue(mockCategory);

      const result = await service.findOne('cat-uuid-1');

      expect(result).toEqual(mockCategory);
      expect(prisma.category.findUnique).toHaveBeenCalledWith({
        where: { categoryId: 'cat-uuid-1' },
      });
    });

    it('should throw NotFoundException when category is not found', async () => {
      prisma.category.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when category is soft-deleted', async () => {
      prisma.category.findUnique.mockResolvedValue({
        ...mockCategory,
        isDeleted: true,
      });

      await expect(service.findOne('cat-uuid-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ── create ─────────────────────────────────────────────

  describe('create', () => {
    it('should create and return a new category', async () => {
      const dto = { categoryName: 'Furniture' };
      const created = { ...mockCategory, categoryName: 'Furniture' };
      prisma.category.create.mockResolvedValue(created);

      const result = await service.create(dto);

      expect(result).toEqual(created);
      expect(prisma.category.create).toHaveBeenCalledWith({
        data: { categoryName: 'Furniture' },
      });
    });
  });

  // ── update ─────────────────────────────────────────────

  describe('update', () => {
    it('should update and return the category', async () => {
      const dto = { categoryName: 'Updated Name' };
      const updated = { ...mockCategory, categoryName: 'Updated Name' };

      prisma.category.findUnique.mockResolvedValue(mockCategory);
      prisma.category.update.mockResolvedValue(updated);

      const result = await service.update('cat-uuid-1', dto);

      expect(result).toEqual(updated);
      expect(prisma.category.update).toHaveBeenCalledWith({
        where: { categoryId: 'cat-uuid-1' },
        data: dto,
      });
    });

    it('should throw NotFoundException when category does not exist', async () => {
      prisma.category.findUnique.mockResolvedValue(null);

      await expect(
        service.update('non-existent', { categoryName: 'X' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when category is soft-deleted', async () => {
      prisma.category.findUnique.mockResolvedValue({
        ...mockCategory,
        isDeleted: true,
      });

      await expect(
        service.update('cat-uuid-1', { categoryName: 'X' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ── delete ─────────────────────────────────────────────

  describe('delete', () => {
    it('should soft-delete the category', async () => {
      const deleted = {
        ...mockCategory,
        isDeleted: true,
        isActive: false,
        deletedAt: expect.any(Date),
      };

      prisma.category.findUnique.mockResolvedValue(mockCategory);
      prisma.category.update.mockResolvedValue(deleted);

      const result = await service.delete('cat-uuid-1');

      expect(result).toEqual(deleted);
      expect(prisma.category.update).toHaveBeenCalledWith({
        where: { categoryId: 'cat-uuid-1' },
        data: {
          isDeleted: true,
          deletedAt: expect.any(Date),
          isActive: false,
        },
      });
    });

    it('should throw NotFoundException when category does not exist', async () => {
      prisma.category.findUnique.mockResolvedValue(null);

      await expect(service.delete('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when category is already soft-deleted', async () => {
      prisma.category.findUnique.mockResolvedValue({
        ...mockCategory,
        isDeleted: true,
      });

      await expect(service.delete('cat-uuid-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
