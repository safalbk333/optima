import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ContractService } from './contract.service';
import { PrismaService } from '../../../../../libs/database/prisma-service';

describe('ContractService', () => {
  let service: ContractService;
  let prisma: PrismaService;

  const mockPrismaService = {
    contract: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContractService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ContractService>(ContractService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all contracts', async () => {
      const result = [{ id: '1', name: 'Contract 1' }];
      mockPrismaService.contract.findMany.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
      expect(prisma.contract.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a contract by id', async () => {
      const result = { id: '1', name: 'Contract 1' };
      mockPrismaService.contract.findUnique.mockResolvedValue(result);

      expect(await service.findOne('1')).toBe(result);
      expect(prisma.contract.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException if contract not found', async () => {
      mockPrismaService.contract.findUnique.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a contract', async () => {
      const dto = { name: 'New Contract' };
      const result = { id: '1', ...dto };
      mockPrismaService.contract.create.mockResolvedValue(result);

      expect(await service.create(dto as any)).toBe(result);
      expect(prisma.contract.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('update', () => {
    it('should update a contract', async () => {
      const contract = { id: '1', name: 'Old Contract' };
      const dto = { name: 'Updated Contract' };
      const result = { id: '1', ...dto };
      
      mockPrismaService.contract.findUnique.mockResolvedValue(contract);
      mockPrismaService.contract.update.mockResolvedValue(result);

      expect(await service.update('1', dto as any)).toBe(result);
      expect(prisma.contract.update).toHaveBeenCalledWith({ where: { id: '1' }, data: dto });
    });

    it('should throw NotFoundException if contract not found', async () => {
      mockPrismaService.contract.findUnique.mockResolvedValue(null);

      await expect(service.update('1', {} as any)).rejects.toThrow(NotFoundException);
    });
  });
});
