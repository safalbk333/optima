import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import { NotFoundException } from '@nestjs/common';

import { ContractService } from './contract.service';

import { PrismaService } from 'libs/database/prisma-service';

describe('ContractService', () => {
  let service: ContractService;
  let prisma: PrismaService;

  const mockPrismaService = {
    tbl_contract: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          ContractService,
          {
            provide: PrismaService,
            useValue: mockPrismaService,
          },
        ],
      }).compile();

    service =
      module.get<ContractService>(
        ContractService,
      );

    prisma =
      module.get<PrismaService>(
        PrismaService,
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all contracts', async () => {
      const result = [
        {
          pk_chr_contract_id: '1',
          chr_title: 'Contract 1',
        },
      ];

      mockPrismaService.tbl_contract.findMany.mockResolvedValue(
        result,
      );

      const response =
        await service.findAll();

      expect(
        prisma.tbl_contract.findMany,
      ).toHaveBeenCalled();

      expect(response.data).toEqual(
        result,
      );
    });
  });

  describe('findOne', () => {
    it('should return a contract by id', async () => {
      const result = {
        pk_chr_contract_id: '1',
        chr_title: 'Contract 1',
      };

      mockPrismaService.tbl_contract.findUnique.mockResolvedValue(
        result,
      );

      const response =
        await service.findOne('1');

      expect(
        prisma.tbl_contract.findUnique,
      ).toHaveBeenCalledWith({
        where: {
          pk_chr_contract_id: '1',
        },
      });

      expect(response.data).toEqual(
        result,
      );
    });

    it('should throw NotFoundException if contract not found', async () => {
      mockPrismaService.tbl_contract.findUnique.mockResolvedValue(
        null,
      );

      const response =
        await service.findOne('1');

      expect(
        response.success,
      ).toBe(false);
    });
  });

  describe('create', () => {
    it('should create a contract', async () => {
      const dto = {
        chr_title: 'New Contract',
      };

      const result = {
        pk_chr_contract_id: '1',
        ...dto,
      };

      mockPrismaService.tbl_contract.create.mockResolvedValue(
        result,
      );

      const response =
        await service.create(
          dto as any,
        );

      expect(
        prisma.tbl_contract.create,
      ).toHaveBeenCalledWith({
        data: dto,
      });

      expect(response.data).toEqual(
        result,
      );
    });
  });

  describe('update', () => {
    it('should update a contract', async () => {
      const contract = {
        pk_chr_contract_id: '1',
        chr_title: 'Old Contract',
      };

      const dto = {
        chr_title:
          'Updated Contract',
      };

      const result = {
        pk_chr_contract_id: '1',
        ...dto,
      };

      mockPrismaService.tbl_contract.findUnique.mockResolvedValue(
        contract,
      );

      mockPrismaService.tbl_contract.update.mockResolvedValue(
        result,
      );

      const response =
        await service.update(
          '1',
          dto as any,
        );

      expect(
        prisma.tbl_contract.update,
      ).toHaveBeenCalledWith({
        where: {
          pk_chr_contract_id: '1',
        },
        data: dto,
      });

      expect(response.data).toEqual(
        result,
      );
    });

    it('should return error if contract not found', async () => {
      mockPrismaService.tbl_contract.findUnique.mockResolvedValue(
        null,
      );

      const response =
        await service.update(
          '1',
          {} as any,
        );

      expect(
        response.success,
      ).toBe(false);
    });
  });
});