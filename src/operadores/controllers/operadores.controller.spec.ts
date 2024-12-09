import { Test, TestingModule } from '@nestjs/testing';
import { OperadoresController } from './operadores.controller';
import { OperadoresService } from '../services/operadores.service';
import { Operador } from '../entities/operador.entity';
import { getModelToken } from '@nestjs/mongoose';

describe('OperadoresController', () => {
  let controller: OperadoresController;
  let service: OperadoresService;

  const mockOperadoresModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }
  const mockOperadoresService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findByEmail: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperadoresController],
      providers: [
        { provide: OperadoresService, useValue: mockOperadoresService },
        { provide: getModelToken(Operador.name), useValue: mockOperadoresModel },
      ]
    }).compile();

    controller = module.get<OperadoresController>(OperadoresController);
    service = module.get<OperadoresService>(OperadoresService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOperador', () => {
    it('should return all operadores', async () => {
      const result = [{ email: 'operador1@email.com', password: '123456', role: 'admin'}];
      mockOperadoresService.findAll.mockResolvedValue(result);

      expect(await controller.getAllOperadores(undefined)).toBe(result);
      expect(mockOperadoresService.findAll).toHaveBeenCalled();
    })
})
});
