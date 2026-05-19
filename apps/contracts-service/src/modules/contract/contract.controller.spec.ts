import { Test, TestingModule } from '@nestjs/testing';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';

describe('ContractController', () => {
  let controller: ContractController;
  let service: ContractService;

  const mockContractService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractController],
      providers: [
        {
          provide: ContractService,
          useValue: mockContractService,
        },
      ],
    }).compile();

    controller = module.get<ContractController>(ContractController);
    service = module.get<ContractService>(ContractService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all contracts', async () => {
      const result = [{ id: '1', name: 'Contract 1' }];
      mockContractService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a contract by id', async () => {
      const result = { id: '1', name: 'Contract 1' };
      mockContractService.findOne.mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a contract', async () => {
      const dto = { name: 'New Contract' };
      const result = { id: '1', ...dto };
      mockContractService.create.mockResolvedValue(result);

      expect(await controller.create(dto as any)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update a contract', async () => {
      const payload = { id: '1', data: { name: 'Updated Contract' } };
      const result = { id: '1', name: 'Updated Contract' };
      mockContractService.update.mockResolvedValue(result);

      expect(await controller.update(payload as any)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(payload.id, payload.data);
    });
  });
});
